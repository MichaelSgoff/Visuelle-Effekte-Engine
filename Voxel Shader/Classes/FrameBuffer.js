import GL from "./GL.js";
var viewSizedPoints = {
    positions: [ -1, -1, 0,  1, -1, 0,  1, 1, 0,  -1, 1, 0 ],
    indices:   [ 0, 1, 2,  2, 3, 0 ]
};

class FrameBuffer {
    constructor(height, width)
    {
        const gl = this.gl = GL.getGL();
        this.depthMap = gl.createTexture();
        this.colorMap = gl.createTexture();
        this.width = width;
        this.height = height;
        this.frameBuffer = gl.createFramebuffer();

        gl.bindTexture(gl.TEXTURE_2D, this.depthMap);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.bindTexture(gl.TEXTURE_2D, this.colorMap);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorMap, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthMap, 0);

        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status != gl.FRAMEBUFFER_COMPLETE) {
            console.warn("FBO status: " + status);
        }
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    bind()
    {
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);

        //this.gl.clearColor(1, 1, 1, 1);
        //this.gl.clearDepth(1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        //this.gl.enable(this.gl.DEPTH_TEST);
        //this.gl.depthFunc(this.gl.LEQUAL);
        // this.gl.enable(this.gl.CULL_FACE);
        this.gl.cullFace(this.gl.FRONT); 
    }

    unbind()
    {
        this.gl.cullFace(this.gl.BACK);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
}

export default FrameBuffer