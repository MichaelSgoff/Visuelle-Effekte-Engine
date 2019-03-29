import GL from "./GL.js";

class IndexBuffer {
    constructor(data)
    {
        const gl = this.gl = GL.getGL();
        this.buffer = gl.createBuffer();
        this.data = data;
        this.count = data.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    }

    bind()
    {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffer);
    }

    cleanup()
    {
        this.gl.deleteBuffer(this.buffer);
    }
}

export default IndexBuffer