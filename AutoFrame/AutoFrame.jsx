// AutoFrame
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
	ui();
} else {
	alert('No open documents');
}

function ui() {
	doc = app.activeDocument;
	win = new Window('dialog', 'Header');

	field_for_check = [];

	//Values From Assets
	script_path = File($.fileName).path;
	info_file = File(script_path + '/Assets/DesignerProfile.txt');
	info_file.encoding = 'UTF8';
	info_file.open('r');
	profile_text = info_file.read().split('\n');	
	info_file.close();

	template_svg = File(script_path + '/Assets/Template.svg');

	//Group Main
	group_columns_main = win.add('group', undefined, '');
	group_columns_main.alignment = ['fill', 'center'];
	group_columns_main.orientation = 'row';

	group_columns_left = group_columns_main.add('group', undefined, '');
	group_columns_left.alignment = ['fill', 'center'];
	group_columns_left.orientation = 'column';

	group_columns_right = group_columns_main.add('group', undefined, '');
	group_columns_right.alignment = ['fill', 'center'];
	group_columns_right.orientation = 'column';

	//Group Product Info
	group_product_main = group_columns_left.add('panel', undefined, '');
	group_product_main.alignment = ['fill', 'center'];
	group_product_main.alignChildren = 'right';
	group_product_main.orientation = 'column';

	group_profile_name = group_product_main.add('group', undefined);
	group_profile_name.orientation = 'row';
	designer_name_label = group_profile_name.add('statictext', undefined, 'Designer name:');
	designer_name = group_profile_name.add('edittext', undefined, profile_text[0]);
	designer_name.minimumSize.width = 200;
	field_for_check.push({name: designer_name, text: designer_name_label.text});

	group_profile_phone = group_product_main.add('group', undefined);
	group_profile_phone.orientation = 'row';
	designer_phone_label = group_profile_phone.add('statictext', undefined, 'Designer phone:');
	designer_phone = group_profile_phone.add('edittext', undefined, profile_text[1]);
	designer_phone.minimumSize.width = 200;
	field_for_check.push({name: designer_phone, text: designer_phone_label.text});

	group_customer_name = group_product_main.add('group', undefined);
	group_customer_name.orientation = 'row';
	customer_name_label = group_customer_name.add('statictext', undefined, 'Customer name:');
	customer_name = group_customer_name.add('edittext', undefined, '');
	customer_name.helpTip = 'Enter a Customer name';
	customer_name.minimumSize.width = 200;
	field_for_check.push({name: customer_name, text: customer_name_label.text});

	group_product_name = group_product_main.add('group', undefined);
	group_product_name.orientation = 'row';
	product_name_label = group_product_name.add('statictext', undefined, 'Product name:');
	product_name = group_product_name.add('edittext', undefined, doc.name.split('.')[0]);
	product_name.helpTip = 'Enter a product name / number'; 
	product_name.minimumSize.width = 200;
	field_for_check.push({name: product_name, text: product_name_label.text});

	group_product_addition = group_product_main.add('group', undefined);
	group_product_addition.orientation = 'row';
	group_date = group_product_addition.add('group', undefined);
	group_date.orientation = 'row';
	date = new Date();
	date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
	date_label = group_date.add('statictext', undefined, 'Date:');
	date_value = group_date.add('edittext', undefined, date);
	date_value.minimumSize.width = 100;
	field_for_check.push({name: date_value, text: date_label.text});

	group_part = group_product_addition.add('group', undefined);
	group_part.orientation = 'row';
	part_check = group_part.add('checkbox', undefined, 'Part:');
	part_value = group_part.add('edittext', undefined, '');
	part_value.minimumSize.width = 33;
	part_value.enabled = false;
	part_check.onClick = function() {
		part_value.enabled = part_check.value;
		part_value.onChanging();
	}
	field_for_check.push({name: part_value, text: 'Part '});

	//Group Layout Info
	group_layout_main = group_columns_right.add('panel', undefined, '');
	group_layout_main.alignment = ['fill', 'center'];
	group_layout_main.alignChildren = 'right';
	group_layout_main.orientation = 'column';

	group_bProfile = group_layout_main.add('group', undefined);
	group_bProfile.orientation = 'row';
	bProfile_label = group_bProfile.add('statictext', undefined, 'Board Profile:');
    bProfile_value = group_bProfile.add('edittext', undefined, '');
	bProfile_value.minimumSize.width = 160;
	bProfile_unit = group_bProfile.add('statictext', [0,15,20,35], '');
	bProfile_unit.minimumSize.width = 30;
	field_for_check.push({name: bProfile_value, text: bProfile_label.text});

	group_fefco = group_layout_main.add('group', undefined);
	group_fefco.orientation = 'row';
	fefco_label = group_fefco.add('statictext', undefined, 'FEFCO:');
    fefco_value = group_fefco.add('edittext', undefined, '');
	fefco_value.minimumSize.width = 160;
	fefco_unit = group_fefco.add('statictext', [0,15,20,35], '');
	fefco_unit.minimumSize.width = 30;
	field_for_check.push({name: fefco_value, text: fefco_label.text});

	group_printType = group_layout_main.add('group', undefined);
	group_printType.orientation = 'row';
	printType_label = group_printType.add('statictext', undefined, 'Print Type:');
	printType_list = ['None', 'Flexo Print', 'Flexo Print HQ', 'Digital Print'];
    printType_value = group_printType.add('dropdownlist', [0,0,0,20], printType_list);
	printType_value.minimumSize.width = 160;
    printType_value.selection = 0;
	printType_unit = group_printType.add('statictext', [0,15,20,35], '');
	printType_unit.minimumSize.width = 30;

	group_liniatura = group_layout_main.add('group', undefined);
	group_liniatura.orientation = 'row';
	liniatura_label = group_liniatura.add('statictext', undefined, 'Liniatura:');
    liniatura_value = group_liniatura.add('edittext', undefined, '');
	liniatura_value.minimumSize.width = 160;
	liniatura_unit = group_liniatura.add('statictext', [0,15,20,35], 'lpi');
	liniatura_unit.minimumSize.width = 30;
	liniatura_value.enabled = false;
	field_for_check.push({name: liniatura_value, text: liniatura_label.text});

	group_trapping = group_layout_main.add('group', undefined);
	group_trapping.orientation = 'row';
	trapping_label = group_trapping.add('statictext', undefined, 'Trapping:');
    trapping_value = group_trapping.add('edittext', undefined, '');
	trapping_value.minimumSize.width = 160;
	trapping_unit = group_trapping.add('statictext', [0,15,20,35], 'mm');
	trapping_unit.minimumSize.width = 30;
	trapping_value.enabled = false;
	field_for_check.push({name: trapping_value, text: trapping_label.text});

	group_bias = group_layout_main.add('group', undefined);
	group_bias.orientation = 'row';
	bias_label = group_bias.add('statictext', undefined, 'Bias:');
    bias_value = group_bias.add('edittext', undefined, '');
	bias_value.minimumSize.width = 160;
	bias_unit = group_bias.add('statictext', [0,15,20,35], 'mm');
	bias_unit.minimumSize.width = 30;
	bias_value.enabled = false;
	field_for_check.push({name: bias_value, text: bias_label.text});

	printType_value.onChange = function() {
		if (printType_value.selection == 0) {
			enabled = false;
		} else {
			enabled = true;
		};
		liniatura_value.enabled = enabled;
		trapping_value.enabled = enabled;
		bias_value.enabled = enabled;
	};

	//Group Color
	group_color_main = group_columns_left.add('panel', undefined, '');
	group_color_main.alignment = ['fill', 'center'];
	group_color_main.alignChildren = 'right';
	group_color_main.orientation = 'column';

	colors = ['None', 'Cyan', 'Magenta', 'Yellow', 'Black'];
	color_item = [];
	section_count = 4;

	for (var i=0; i<section_count; i++) {
		layout = group_color_main.add('group', undefined, '');
		section_label = layout.add('statictext', undefined, 'Color ' + (i+1) + ':');
		section_label.minimumSize.width = 10;
		section_color = layout.add('dropdownlist', [0,0,0,20]);
		section_color.minimumSize.width = 200;
		color_item.push(section_color);
	}
	
	// Create Colors List
	for (var i=0; i<doc.spots.length; i++){
		if (doc.spots[i].colorType == 'ColorModel.SPOT') {
			colors.push(doc.spots[i].name);
		}		
	}

	for (var i=0; i<section_count; i++){
		for (var j=0; j<colors.length; j++){
			color_item[i].add('item', colors[j]);
			color_item[i].selection = 0;
		}
	}

	//Group Place Frame
	group_place_main = group_columns_right.add('panel', undefined, '');
	group_place_main.alignment = ['fill', 'center'];
	group_place_main.alignChildren = 'right';
	group_place_main.orientation = 'column';

	group_selectLayer = group_place_main.add('group', undefined);
	group_selectLayer.alignment = 'right';
	group_selectLayer.orientation = 'row';
	selectLayer_label = group_selectLayer.add('statictext', undefined, 'Place to:');
	selectLayer_list = ['New Layer'];
    selectLayer_value = group_selectLayer.add('dropdownlist', [0,0,0,0], selectLayer_list);
	selectLayer_value.minimumSize.width = 200;
    selectLayer_value.selection = 0;
	for (var i=0;i<doc.layers.length;i++) {
		selectLayer_value.add('item', doc.layers[i].name);
	}

	group_newLayer = group_place_main.add('group', undefined);
	group_newLayer.orientation = 'row';
	newLayer_label = group_newLayer.add('statictext', undefined, 'Layer Name:');
    newLayer_value = group_newLayer.add('edittext', undefined, 'Frame');
	newLayer_value.minimumSize.width = 200;
	newLayer_value.enabled = true;
	selectLayer_value.onChange = function() {
		if (selectLayer_value.selection == 0) {
			newLayer_value.enabled = true;
		} else {
			newLayer_value.enabled = false;
		};
	};
	field_for_check.push({name: newLayer_value, text: newLayer_label.text});

	group_scaleFrame = group_place_main.add('group', undefined);
	group_scaleFrame.orientation = 'row';

	scaleFrame_label = group_scaleFrame.add('statictext', undefined, 'Scale Frame:');
	scaleFrame_slider = group_scaleFrame.add('slider', undefined, '');
	scaleFrame_slider.minimumSize.width = 145;
	scaleFrame_slider.minvalue = 45;
	scaleFrame_slider.maxvalue = 100;
	scaleFrame_slider.value = 85;
    scaleFrame_value = group_scaleFrame.add('statictext', undefined, scaleFrame_slider.value);
	scaleFrame_value.minimumSize.width = 20;
	scaleFrame_unit = group_scaleFrame.add('statictext', undefined, '%');
	scaleFrame_unit.minimumSize.width = 10;
	scaleFrame_slider.onChanging = function() {
		scaleFrame_value.text = Math.round(scaleFrame_slider.value);
	};

	//Group Standard Buttons
	group_btn = win.add('group', undefined, '');
	group_btn.alignment = 'right';
	group_btn.orientation = 'row';

	info_label = group_btn.add('statictext', undefined, '');
	info_label.alignChildren = ['fill', 'center'];
	info_label.minimumSize.width = 480;

	btn_ok = group_btn.add('button', undefined, 'OK', {name:'ok'}); 
	btn_ok.onClick = event_ok;
	btn_cancel = group_btn.add('button', undefined, 'Cancel', {name:'cancel'});
	btn_cancel.onClick = event_close;

	win.center(); 
	win.show();
}

function event_close() {
	win.close();
}

function event_ok() {
	for (var i=0; i<field_for_check.length; i++){
		if (field_for_check[i].name.enabled == true && field_for_check[i].name.text == '') {
			info_label.text = 'Please enter ' + field_for_check[i].text.slice(0, -1) + '.';
			return -1;
		}
	}
	start();
}

function start() {
	if (selectLayer_value.selection == 0) {
		main_layer = doc.layers.add();
		main_layer.name = newLayer_value.text;
	} else {
		main_layer = doc.layers.getByName(selectLayer_value.selection.text);
	}

    doc.activeLayer = main_layer;
    main_layer.visible = true;
    main_layer.locked = false;

	doc_vb = doc.visibleBounds;

	placed_svg = main_layer.groupItems.createFromFile(template_svg);
    placed_svg.name = 'Frame';

	vb_width = (doc_vb[2] - doc_vb[0]) / 2.834645669;
    placed_svg_width = placed_svg.width / 2.834645669;
	x = ((Math.round(scaleFrame_slider.value) * vb_width) / placed_svg_width) - 100;
	placed_svg.resize(
	100 + x, // x
	100 + x, // y
	true, // changePositions
	true, // changeFillPatterns
	true, // changeFillGradients
	true, // changeStrokePattern
	100 + x, // changeLineWidths
	undefined);

	padding = 20;
	bottom_padding = 40;
	placed_svg.position = [doc_vb[0], doc_vb[3] - bottom_padding];
    position = [doc_vb[0] - padding, 
				doc_vb[1] + padding, 
				doc_vb[2] + padding, 
				doc_vb[3] - placed_svg.height - (bottom_padding + padding)];
    doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect = position;
    app.executeMenuCommand ('fitin');

	group_placed_svg = main_layer.groupItems[placed_svg.name];
	text_frames = group_placed_svg.textFrames;
	for (var i=0; i<text_frames.length; i++){
		if(text_frames[i].contents == '#designer'){
			text_frames[i].contents = 'Designer: ' + designer_name.text;
		}
		if(text_frames[i].contents == '#phone'){
			text_frames[i].contents = 'Phone: ' + designer_phone.text;
		}
		if(text_frames[i].contents == '#customer'){
			text_frames[i].contents = 'Customer: ' + customer_name.text.toUpperCase();
		}
		if(text_frames[i].contents == '#product'){
			text_frames[i].contents = 'Product: ' + product_name.text + ' ' + part_value.text;
		}
		if(text_frames[i].contents == '#date'){
			text_frames[i].contents = 'Date: ' + date_value.text;
		}
		if(text_frames[i].contents == '#board_profile'){
			text_frames[i].contents = 'Profile: ' + bProfile_value.text;
		}
		if(text_frames[i].contents == '#fefco'){
			text_frames[i].contents = 'FEFCO: ' + fefco_value.text;
		}
		if(text_frames[i].contents == '#print_type'){
			text_frames[i].contents = 'Print Type: ' + printType_value.selection.text;
		}
		if(text_frames[i].contents == '#trapping'){
			text_frames[i].contents = 'Trapping: ' + trapping_value.text + ' ' + trapping_unit.text;
		}
		if(text_frames[i].contents == '#liniatura'){
			text_frames[i].contents = 'Liniatura: ' + liniatura_value.text + ' ' + liniatura_unit.text;
		}
		if(text_frames[i].contents == '#bias'){
			text_frames[i].contents = 'Bias: ' + bias_value.text + ' ' + bias_unit.text;
		}

		for (var j=0; j<section_count; j++){
			if(text_frames[i].contents == '#color_' + (j+1)){
				if(color_item[j].selection.text !== 'None'){
					cmyk_color = new CMYKColor();
					if(color_item[j].selection.text == 'Cyan'){
						cmyk_color.cyan = 100;
						color = cmyk_color;
					}else if (color_item[j].selection.text == 'Magenta'){
						cmyk_color.magenta = 100;
						color = cmyk_color;
					}else if (color_item[j].selection.text == 'Yellow'){
						cmyk_color.yellow = 100;
						color = cmyk_color;
					}else if (color_item[j].selection.text == 'Black'){
						cmyk_color.black = 100;
						color = cmyk_color;
					}else{
						color = doc.swatches[color_item[j].selection.text].color;
					}
					text_frames[i].contents = (j+1) + '   ' + color_item[j].selection.text;
					group_placed_svg.pathItems["color_box_" + (j+1)].fillColor = color;
				}else {
					text_frames[i].contents = (j+1);
				}
				break;
			}		
		}
	}

	app.executeMenuCommand ('deselectall');
	win.close();
}