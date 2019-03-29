import IndexBuffer from './IndexBuffer.js';
import VertexArray from './VertexArray.js';
import VertexBuffer from './VertexBuffer.js';
import GameObject from './GameObject.js';

class Sphere
{
    constructor(shader, hasTexture, color, texture)
    {
        this.initSphere();
        this.shader = shader;
        this.color = color;
        this.texture = texture;
        this.canBeDrawn = true;
        this.hasTexture = this.hasTexture;
        this.ib = new IndexBuffer(this.indices);
        let vertexArray = new VertexArray();
        const vb1 = new VertexBuffer(this.vertices);
        let posAttribLocation = shader.getParameter("aPosition");
        vertexArray.addBuffer(vb1, [posAttribLocation], 3);
        const vb2 = new VertexBuffer(this.vertices);
        let normalAttribLocation = shader.getParameter("aNormal");
        vertexArray.addBuffer(vb2, [normalAttribLocation], 3);

        if (hasTexture)
        {
            const vb2 = new VertexBuffer(textureCoordinates);
            let texCoordsAttribLocation = shader.getParameter("aTexCoord");
            vertexArray.addBuffer(vb2, [0], 2);
            this.gameObject = new GameObject(vertexArray, this.ib, texture);
        }
        else
        {
            this.gameObject = new GameObject(vertexArray, this.ib, color);
        }
    }

    initSphere()
    {
      // Nochmal Jung Code angucken
      let SPHERE_DIV = 12;
      let i, ai, si, ci;
      let j, aj, sj, cj;
      let p1, p2;

      // Vertices
      let vertices = [], indices = [];
      for (j = 0; j <= SPHERE_DIV; j++) {
        aj = j * Math.PI / SPHERE_DIV;
        sj = Math.sin(aj);
        cj = Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) {
          ai = i * 2 * Math.PI / SPHERE_DIV;
          si = Math.sin(ai);
          ci = Math.cos(ai);

          vertices.push(si * sj);  // X
          vertices.push(cj);       // Y
          vertices.push(ci * sj);  // Z
        }
      }

      // Indices
      for (j = 0; j < SPHERE_DIV; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
          p1 = j * (SPHERE_DIV+1) + i;
          p2 = p1 + (SPHERE_DIV+1);

          indices.push(p1);
          indices.push(p2);
          indices.push(p1 + 1);

          indices.push(p1 + 1);
          indices.push(p2);
          indices.push(p2 + 1);
        }
      }

      this.indices = indices;
      this.vertices = vertices;
    }
}
export default Sphere