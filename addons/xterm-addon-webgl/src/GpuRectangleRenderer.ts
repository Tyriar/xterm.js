/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { DIM_OPACITY } from 'browser/renderer/shared/Constants';
import { IRenderDimensions } from 'browser/renderer/shared/Types';
import { IThemeService } from 'browser/services/Services';
import { Attributes, BgFlags, FgFlags } from 'common/buffer/Constants';
import { Disposable } from 'common/Lifecycle';
import { IColor } from 'common/Types';
import { RENDER_MODEL_BG_OFFSET, RENDER_MODEL_FG_OFFSET, RENDER_MODEL_INDICIES_PER_CELL } from './RenderModel';
import { IRenderModel } from './Types';
import { expandFloat32Array, PROJECTION_MATRIX } from './WebglUtils';
import { Terminal } from 'xterm';

const enum VertexAttribLocations {
  POSITION = 0,
  SIZE = 1,
  COLOR = 2,
  UNIT_QUAD = 3
}

const shaderSource = `
// struct VSUniforms {
//   projection: mat4x4f,
// };
// @group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;

struct VSInput {
  @location(0) position: vec2f,
  @location(1) size: vec2f,
  @location(2) color: vec4f,
  @location(3) unitquad: vec2f
};

@vertex fn vs(
  v: VSInput
  // @builtin(vertex_index) vertexIndex : u32
) -> @builtin(position) vec4f {

  // var pos = array<vec2f, 3>(
  //   vec2f( 0.0,  0.5),  // top center
  //   vec2f(-0.5, -0.5),  // bottom left
  //   vec2f( 0.5, -0.5)   // bottom right
  // );
  // return vsUniforms.projection * vec4f(pos[vertexIndex], 0.0, 1.0);

  // var zeroToOne: vec2f = v.position + (v.unitquad * v.size);

  var zeroToOne: vec2f = v.position + (v.unitquad * v.size);

  return vec4f(zeroToOne, 0.0, 1.0);

}

@fragment fn fs() -> @location(0) vec4f {
  return vec4f(1, 0, 0, 1);
}
`;

interface IVertices {
  attributes: Float32Array;
  count: number;
}

// TODO: Const enum
const INDICES_PER_RECTANGLE = 8;
const INITIAL_BUFFER_RECTANGLE_CAPACITY = 20 * INDICES_PER_RECTANGLE;

// Work variables to avoid garbage collection
let $rgba = 0;
let $isDefault = false;
let $x1 = 0;
let $y1 = 0;
let $r = 0;
let $g = 0;
let $b = 0;
let $a = 0;

export class GpuRectangleRenderer extends Disposable {
  private _presentationFormat: GPUTextureFormat;
  private _renderPassDescriptor: GPURenderPassDescriptor;
  private _pipeline: GPURenderPipeline;
  // private _bindGroup: GPUBindGroup;

  private _vertices: IVertices = {
    count: 0,
    attributes: new Float32Array(INITIAL_BUFFER_RECTANGLE_CAPACITY)
  };
  // private _vsUniformBuffer: GPUBuffer;
  // private _worldViewProjection: Float32Array;
  // private _vsUniformValues: Float32Array;
  private _positionBuffer: GPUBuffer;
  private _sizeBuffer: GPUBuffer;
  private _coordBuffer: GPUBuffer;
  private _unitquadBuffer: GPUBuffer;

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
      code: shaderSource
    });

    function createBuffer(device: GPUDevice, data: Float32Array | Uint16Array, usage: number): GPUBuffer {
      const buffer = device.createBuffer({
        size: data.byteLength,
        usage,
        mappedAtCreation: true
      });
      const dst = new (data.constructor as any)(buffer.getMappedRange());
      dst.set(data);
      buffer.unmap();
      return buffer;
    }

    const positions = new Float32Array([1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const size   = new Float32Array([16, 32, 16, 32, 16, 32,
      16, 32, 16, 32, 16, 32, 16, 32, 16, 32, 16, 32]);
    const color = new Float32Array([1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1]);
    const unitquad = new Float32Array([0, 0, 1, 0, 0, 1,
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);

    this._positionBuffer = createBuffer(this._device, positions, GPUBufferUsage.VERTEX);
    this._sizeBuffer = createBuffer(this._device, size, GPUBufferUsage.VERTEX);
    this._coordBuffer = createBuffer(this._device, color, GPUBufferUsage.VERTEX);
    this._unitquadBuffer = createBuffer(this._device, unitquad, GPUBufferUsage.VERTEX);

    this._pipeline = this._device.createRenderPipeline({
      label: 'our hardcoded red triangle pipeline',
      layout: 'auto',
      vertex: {
        module,
        entryPoint: 'vs',
        buffers: [
          // position
          {
            arrayStride: 2 * 4, // 2 floats, 4 bytes each
            attributes: [
              { shaderLocation: 0, offset: 0, format: 'float32x2' }
            ]
          },
          // size
          {
            arrayStride: 2 * 4, // 2 floats, 4 bytes each
            attributes: [
              { shaderLocation: 1, offset: 0, format: 'float32x2' }
            ]
          },
          // color
          {
            arrayStride: 4 * 4, // 4 floats, 4 bytes each
            attributes: [
              { shaderLocation: 2, offset: 0, format: 'float32x4' }
            ]
          },
          // unitquad
          {
            arrayStride: 2 * 4, // 2 floats, 4 bytes each
            attributes: [
              { shaderLocation: 3, offset: 0, format: 'float32x2' }
            ]
          }
        ]
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

    const vUniformBufferSize = 1 * 16 * 4; // 1 mat4s * 16 floats per mat * 4 bytes per float

    // this._vsUniformBuffer = this._device.createBuffer({
    //   size: vUniformBufferSize,
    //   usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    // });
    // this._vsUniformValues = new Float32Array(1 * 16); // 1 mat4s
    // this._worldViewProjection = this._vsUniformValues.subarray(0, 16);

    // this._bindGroup = this._device.createBindGroup({
    //   layout: this._pipeline.getBindGroupLayout(0),
    //   entries: [
    //     { binding: 0, resource: { buffer: this._vsUniformBuffer } }
    //   ]
    // });
  }

  // #region Render

  public render(): void {
    // this._worldViewProjection.set(PROJECTION_MATRIX, 0);
    // this._worldViewProjection.set([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    // this._device.queue.writeBuffer(this._vsUniformBuffer, 0, this._vsUniformValues);

    // TODO: Investigate types
    (this._renderPassDescriptor.colorAttachments as GPURenderPassColorAttachment[])[0].view =
        this._ctx.getCurrentTexture().createView();

    // make a command encoder to start encoding commands
    const encoder = this._device.createCommandEncoder({ label: 'our encoder' });

    // make a render pass encoder to encode render specific commands
    const pass = encoder.beginRenderPass(this._renderPassDescriptor);
    pass.setPipeline(this._pipeline);
    // pass.setBindGroup(0, this._bindGroup);
    pass.setVertexBuffer(0, this._positionBuffer);
    pass.setVertexBuffer(1, this._sizeBuffer);
    pass.setVertexBuffer(2, this._coordBuffer);
    pass.setVertexBuffer(3, this._unitquadBuffer);

    // TODO: Pass in vertex count?
    pass.draw(3);  // call our vertex shader 3 times.
    pass.end();

    const commandBuffer = encoder.finish();
    this._device.queue.submit([commandBuffer]);
  }

  // #endregion Render

  // #region Update

  public update(model: IRenderModel): void {
    const terminal = this._terminal;
    const vertices = this._vertices;

    // Declare variable ahead of time to avoid garbage collection
    let rectangleCount = 1;
    let y: number;
    let x: number;
    let currentStartX: number;
    let currentBg: number;
    let currentFg: number;
    let currentInverse: boolean;
    let modelIndex: number;
    let bg: number;
    let fg: number;
    let inverse: boolean;
    let offset: number;

    for (y = 0; y < terminal.rows; y++) {
      currentStartX = -1;
      currentBg = 0;
      currentFg = 0;
      currentInverse = false;
      for (x = 0; x < terminal.cols; x++) {
        modelIndex = ((y * terminal.cols) + x) * RENDER_MODEL_INDICIES_PER_CELL;
        bg = model.cells[modelIndex + RENDER_MODEL_BG_OFFSET];
        fg = model.cells[modelIndex + RENDER_MODEL_FG_OFFSET];
        inverse = !!(fg & FgFlags.INVERSE);
        if (bg !== currentBg || (fg !== currentFg && (currentInverse || inverse))) {
          // A rectangle needs to be drawn if going from non-default to another color
          if (currentBg !== 0 || (currentInverse && currentFg !== 0)) {
            offset = rectangleCount++ * INDICES_PER_RECTANGLE;
            this._updateRectangle(vertices, offset, currentFg, currentBg, currentStartX, x, y);
          }
          currentStartX = x;
          currentBg = bg;
          currentFg = fg;
          currentInverse = inverse;
        }
      }
      // Finish rectangle if it's still going
      if (currentBg !== 0 || (currentInverse && currentFg !== 0)) {
        offset = rectangleCount++ * INDICES_PER_RECTANGLE;
        this._updateRectangle(vertices, offset, currentFg, currentBg, currentStartX, terminal.cols, y);
      }
    }
    vertices.count = rectangleCount;
  }
  private _updateRectangle(vertices: IVertices, offset: number, fg: number, bg: number, startX: number, endX: number, y: number): void {
    $isDefault = false;
    if (fg & FgFlags.INVERSE) {
      switch (fg & Attributes.CM_MASK) {
        case Attributes.CM_P16:
        case Attributes.CM_P256:
          $rgba = this._themeService.colors.ansi[fg & Attributes.PCOLOR_MASK].rgba;
          break;
        case Attributes.CM_RGB:
          $rgba = (fg & Attributes.RGB_MASK) << 8;
          break;
        case Attributes.CM_DEFAULT:
        default:
          $rgba = this._themeService.colors.foreground.rgba;
      }
    } else {
      switch (bg & Attributes.CM_MASK) {
        case Attributes.CM_P16:
        case Attributes.CM_P256:
          $rgba = this._themeService.colors.ansi[bg & Attributes.PCOLOR_MASK].rgba;
          break;
        case Attributes.CM_RGB:
          $rgba = (bg & Attributes.RGB_MASK) << 8;
          break;
        case Attributes.CM_DEFAULT:
        default:
          $rgba = this._themeService.colors.background.rgba;
          $isDefault = true;
      }
    }

    if (vertices.attributes.length < offset + 4) {
      vertices.attributes = expandFloat32Array(vertices.attributes, this._terminal.rows * this._terminal.cols * INDICES_PER_RECTANGLE);
    }
    $x1 = startX * this._dimensions.device.cell.width;
    $y1 = y * this._dimensions.device.cell.height;
    $r = (($rgba >> 24) & 0xFF) / 255;
    $g = (($rgba >> 16) & 0xFF) / 255;
    $b = (($rgba >> 8 ) & 0xFF) / 255;
    $a = (!$isDefault && bg & BgFlags.DIM) ? DIM_OPACITY : 1;

    this._addRectangle(vertices.attributes, offset, $x1, $y1, (endX - startX) * this._dimensions.device.cell.width, this._dimensions.device.cell.height, $r, $g, $b, $a);
  }

  private _addRectangle(array: Float32Array, offset: number, x1: number, y1: number, width: number, height: number, r: number, g: number, b: number, a: number): void {
    array[offset    ] = x1 / this._dimensions.device.canvas.width;
    array[offset + 1] = y1 / this._dimensions.device.canvas.height;
    array[offset + 2] = width / this._dimensions.device.canvas.width;
    array[offset + 3] = height / this._dimensions.device.canvas.height;
    array[offset + 4] = r;
    array[offset + 5] = g;
    array[offset + 6] = b;
    array[offset + 7] = a;
  }

  private _addRectangleFloat(array: Float32Array, offset: number, x1: number, y1: number, width: number, height: number, color: Float32Array): void {
    array[offset    ] = x1 / this._dimensions.device.canvas.width;
    array[offset + 1] = y1 / this._dimensions.device.canvas.height;
    array[offset + 2] = width / this._dimensions.device.canvas.width;
    array[offset + 3] = height / this._dimensions.device.canvas.height;
    array[offset + 4] = color[0];
    array[offset + 5] = color[1];
    array[offset + 6] = color[2];
    array[offset + 7] = color[3];
  }

  private _colorToFloat32Array(color: IColor): Float32Array {
    return new Float32Array([
      ((color.rgba >> 24) & 0xFF) / 255,
      ((color.rgba >> 16) & 0xFF) / 255,
      ((color.rgba >> 8 ) & 0xFF) / 255,
      ((color.rgba      ) & 0xFF) / 255
    ]);
  }

  // #endregion Update
}
