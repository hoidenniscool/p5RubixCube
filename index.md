<html>
<head>
    <script src="p5.js"></script>
    <script src="sketch.js"></script>
</head>
<body>
    Size<input type="text" value="3" onchange="setup()" id="RubixSize"><br />
    RotateSpeed<input type="range" min="0" max="8" value="0" id="RotateSpeed"><br />
    <!-- 
    RotateX<input type="range" min="0" max="360" value="0" id="RotateX"><br />
    RotateY<input type="range" min="0" max="360" value="0" id="RotateY"><br />
    RotateZ<input type="range" min="0" max="360" value="0" id="RotateZ"><br />-->
    <button onClick="scrableCount = 100">ScrableRubix</button>
    <table>
        <tr>
            <td><button onClick="RubixRotateX(-1)">x-1</button></td>
            <td><button onClick="RubixRotateX(0)">x0</button></td>
            <td><button onClick="RubixRotateX(1)">x1</button></td>
        </tr>
        <tr>
            <td><button onClick="RubixRotateY(-1)">y-1</button></td>
            <td><button onClick="RubixRotateY(0)">y0</button></td>
            <td><button onClick="RubixRotateY(1)">y1</button></td>
        </tr>
        <tr>
            <td><button onClick="RubixRotateZ(-1)">z-1</button></td>
            <td><button onClick="RubixRotateZ(0)">z0</button></td>
            <td><button onClick="RubixRotateZ(1)">z1</button></td>
        </tr>
    </table>
</body>
</html>