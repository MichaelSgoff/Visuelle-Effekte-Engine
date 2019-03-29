import GL from "./GL.js";

class VertexArray {
    constructor(program, stride)
    {
        const gl = this.gl = GL.getGL();
        this.vertexArray = gl.createVertexArray();
        gl.bindVertexArray(this.vertexArray);
    }

    bind()
    {
        this.gl.bindVertexArray(this.vertexArray);
    }

    addBuffer(vb, vbElements, stride)
    {
        this.bind();
        vb.bind();

        let offset = 0;
        for(let i = 0; i < vbElements.length; i++)
        {
            let element = vbElements[i];

            // Tell WebGL how to take date from the buffer and supply it to
            // the attribute in the shader. For that, its necessary to turn
            // the attribute on.
            this.gl.enableVertexAttribArray(element);

            // Tell the attribute how to get data out of positionBuffer.
            //this.gl.vertexAttribPointer(element, element.count, this.gl.FLOAT, element.normalized, stride * element.count, offset);
            this.gl.vertexAttribPointer(element, stride, this.gl.FLOAT, false, stride * i, offset);

            // Nur floats
            offset += element.count * 4;
        }
        
    }
}

export default VertexArray