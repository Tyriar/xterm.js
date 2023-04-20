/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { createProgram, expandFloat32Array, PROJECTION_MATRIX } from './WebglUtils';
import { IRenderModel, IWebGLVertexArrayObject, IWebGL2RenderingContext } from './Types';
import { Attributes, BgFlags, FgFlags } from 'common/buffer/Constants';
import { Terminal } from 'xterm';
import { IColor } from 'common/Types';
import { IColorSet, ReadonlyColorSet } from 'browser/Types';
import { IRenderDimensions } from 'browser/renderer/shared/Types';
import { RENDER_MODEL_BG_OFFSET, RENDER_MODEL_FG_OFFSET, RENDER_MODEL_INDICIES_PER_CELL } from './RenderModel';
import { Disposable, toDisposable } from 'common/Lifecycle';
import { DIM_OPACITY } from 'browser/renderer/shared/Constants';
import { throwIfFalsy } from 'browser/renderer/shared/RendererUtils';
import { IThemeService } from 'browser/services/Services';

export class GpuRectangleRenderer extends Disposable {
  private _presentationFormat: GPUTextureFormat;
  private _renderPassDescriptor: GPURenderPassDescriptor;
  private _pipeline: GPURenderPipeline;

  constructor(
    private _terminal: Terminal,
    private _ctx: GPUCanvasContext,
    private _adapter: GPUAdapter,
    private _device: GPUDevice,
    private _dimensions: IRenderDimensions,
    private readonly _themeService: IThemeService
  ) {
    super();

    this._presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this._ctx.configure({
      device: this._device,
      format: this._presentationFormat
    });

    const module = this._device.createShaderModule({
      label: 'our hardcoded red triangle shaders',
      code: `
        @vertex fn vs(
          @builtin(vertex_index) vertexIndex : u32
        ) -> @builtin(position) vec4f {
          var pos = array<vec2f, 3>(
            vec2f( 0.0,  0.5),  // top center
            vec2f(-0.5, -0.5),  // bottom left
            vec2f( 0.5, -0.5)   // bottom right
          );

          return vec4f(pos[vertexIndex], 0.0, 1.0);
        }

        @fragment fn fs() -> @location(0) vec4f {
          return vec4f(1, 0, 0, 1);
        }
      `
    });

    this._pipeline = this._device.createRenderPipeline({
      label: 'our hardcoded red triangle pipeline',
      layout: 'auto',
      vertex: {
        module,
        entryPoint: 'vs'
      },
      fragment: {
        module,
        entryPoint: 'fs',
        targets: [{ format: this._presentationFormat }]
      }
    });

    this._renderPassDescriptor = {
      label: 'our basic canvas renderPass',
      colorAttachments: [
        {
          // view: <- to be filled out when we render
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: 'clear',
          storeOp: 'store'
        }
      ] as any // TODO: Investigate
    };
  }

  public render(): void {
    // TODO: Investigate`
    (this._renderPassDescriptor.colorAttachments as GPURenderPassColorAttachment[])[0].view =
        this._ctx.getCurrentTexture().createView();

    // make a command encoder to start encoding commands
    const encoder = this._device.createCommandEncoder({ label: 'our encoder' });

    // make a render pass encoder to encode render specific commands
    const pass = encoder.beginRenderPass(this._renderPassDescriptor);
    pass.setPipeline(this._pipeline);
    pass.draw(3);  // call our vertex shader 3 times.
    pass.end();

    const commandBuffer = encoder.finish();
    this._device.queue.submit([commandBuffer]);
  }
}
