// Dimension
// Copyright (C) 2023 VGmove
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

if(app.documents.length != 0) {
	get_layer();
} else {
	alert('No open documents');
}

function get_layer() {
    doc = app.activeDocument;
    selectedObject = doc.selection;

    if (selectedObject.length == 0){
        alert("Select Line");
    }else {
        dim_layer = "";
        for (i=0 ; i<doc.layers.length; i++){
            if (doc.layers[i].name == "Dimensions"){
                dim_layer = doc.layers.getByName("Dimensions");
                break;
            }
        }
        if (dim_layer == ""){
            new_dim_layer = app.activeDocument.layers.add();
            new_dim_layer.name = "Dimensions";
            dim_layer = new_dim_layer;
        }
        dim_layer.visible = true;
        dim_layer.locked = false;
        set_dimensions();
        app.executeMenuCommand ('deselectall');
    }
}

function set_dimensions() {
    for (i=0 ; i<selectedObject.length; i++){
        if (selectedObject[i].typename == "PathItem" && selectedObject[i].pathPoints.length == 2){
            convert_w = (selectedObject[i].width / 2.834645669);
            convert_h = (selectedObject[i].height / 2.834645669);
            length = (Math.sqrt((Math.pow(convert_w, 2)) + (Math.pow(convert_h, 2)))).toFixed(0)
            
            dimensionFrame = dim_layer.textFrames.add();
            dimensionFrame.contents = length + " mm \n";
            color = new CMYKColor();
            color.magenta = 100;
            dimensionFrame.textRange.characterAttributes.size = 30;
            dimensionFrame.textRange.characterAttributes.fillColor = color;

            pos_x = (selectedObject[i].position[0] + selectedObject[i].width / 2) - dimensionFrame.width / 2;
            pos_y = (selectedObject[i].position[1] - selectedObject[i].height / 2) + dimensionFrame.height / 2;
            dimensionFrame.position = [pos_x, pos_y];
            dimensionFrame.rotate(selectedObject[i].tags[0].value * (180 / Math.PI));
            dimensionFrame.contents = dimensionFrame.contents.slice(0, -2);

            selectedObject[i].move(dim_layer, ElementPlacement.PLACEATEND);
            selectedObject[i].filled = false;
            selectedObject[i].stroked = true;
            selectedObject[i].strokeWidth = 0.8;
            selectedObject[i].strokeColor = color;
        }
    }
    
}