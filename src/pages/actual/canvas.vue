<template>
  <div class="canvas-wrap">
    <canvas width="1600" height="1600"></canvas>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { packFetch } from '@/utils/index';

export default {
  name: 'canvasIndex',
  data() {
    this.dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';
    return {
      data: {}
    };
  },
  mounted() {
    this.drawRegionCanvas();
  },
  methods: {
    async drawRegionCanvas() {
      const canvas = document.querySelector('canvas');
      const context = canvas.getContext('2d');
      const TAU = 2 * Math.PI;

      const data = await packFetch(this.dataSource);

      const regions = d3
        .hierarchy(data)
        .sum((d) => 1)
        .sort((a, b) => b.value - a.value);

      const pack = d3
        .pack()
        .size([1600, 1600])
        .padding(3);

      const root = pack(regions);

      const draw = (ctx, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) => {
        const children = node.children;
        const { x, y, r } = node;

        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fill();
        if (children) {
          for (let i = 0; i < children.length; i++) {
            draw(context, children[i]);
          }
        } else {
          const name = node.data.name;
          ctx.fillStyle = textColor;
          ctx.font = '1.5rem Arial';
          ctx.textAlign = 'center';
          ctx.fillText(name, x, y);
        }
      };
      draw(context, root);
    }
  }
};
</script>

<style>
.canvas-wrap > canvas {
  width: 800px;
  height: 800px;
}
</style>
