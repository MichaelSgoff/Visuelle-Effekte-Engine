import GL from "./GL.js";
import Transform from "./Transform.js";

class GameObject
{
    constructor(va, ib, material)
    {
        this.gl = GL.getGL();
        this.vertexArray = va;
        this.indexBuffer = ib;
        this.material = material
        this.transform  = new Transform();
    }

    draw(withMaterial = true)
    {
        this.vertexArray.bind();
        this.indexBuffer.bind();

        if (withMaterial)
        {
            this.material.bind();
        }

        this.gl.drawElements(this.gl.TRIANGLES, this.indexBuffer.count, this.gl.UNSIGNED_SHORT, 0);
    }
}
export default GameObject