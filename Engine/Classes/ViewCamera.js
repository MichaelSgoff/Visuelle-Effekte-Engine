import GL from "./GL.js";
import Transform from "./Transform.js";

class ViewCamera extends Transform
{
    constructor(projectionMatrix)
    {
        super();

        this.gl = GL.getGL();
        this.viewMatrix = mat4.create();
        this.projectionMatrix = projectionMatrix;
        this.cameraMatrix = mat4.create();
        this.viewProjectionMatrix = mat4.create();
        this.cameraTransform = new Transform();
        this.setParent(this.cameraTransform);
    }

    getViewProjectionMatrix()
    {
        this.viewMatrix = this.getWorldMatrix();
        this.cameraMatrix = mat4.invert(this.cameraMatrix, this.viewMatrix);
        this.viewProjectionMatrix = mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
        return this.viewProjectionMatrix;
    }

    getViewMatrix()
    {
        return this.getWorldMatrix();
    }
}

export default ViewCamera