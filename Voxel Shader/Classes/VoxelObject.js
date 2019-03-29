import GL from "./GL.js";
import Transform from "./Transform.js";
import VertexArray from "./VertexArray.js";
import VertexBuffer from "./VertexBuffer.js";
import IndexBuffer from "./IndexBuffer.js";
import GameObject from "./Gameobject.js";
import Color from "./Color.js";
import Cube from "./Cube.js";
import shader from "./Shader.js";
import color from "./Color.js"
class VoxelObject
{
   
    constructor(file)
    {
        this.gl = GL.getGL();
        this.scaleFac = 1;
        this.positions = new Array();
   

        var request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.send();

        request.onload = () => {
            var objDoc = new OBJDocVoxel(file);
            if (!objDoc.parse(request.responseText, this.scaleFac, true)) {
                console.error("OBJ file parsing error: " + file);
                return;
            }

            var geo = objDoc.getDrawingInfo();
            console.log(geo);

            for(var i =0; i<= geo.positions.length; i++)
            {
                this.positions.push(geo.positions[i]);
            }
            
        };
    }


    draw()
    {
        this.gameObject.draw();
    }
        
}
export default VoxelObject