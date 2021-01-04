<script>

import { onMount } from 'svelte';

import { install } from '../public/resources/scripts/HTMLUtility';

import SWGButton from './components/SWGButton.svelte';
import SWGTextfield from './components/SWGTextfield.svelte';
import SWGIconTextfield from './components/SWGIconTextfield.svelte';
import SWGIconPasswordTextfield from './components/SWGIconPasswordTextfield.svelte';
import SWGPasswordTextfield from './components/SWGPasswordTextfield.svelte';
import SWGNumericTextfield from './components/SWGNumericTextfield.svelte';
import SWGCheckbox from './components/SWGCheckbox.svelte';
import SWGRadio from './components/SWGRadio.svelte';
import SWGRadioGroup from './components/SWGRadioGroup.svelte';
import SWGSelectBox from './components/SWGSelectBox.svelte';
import SWGSelectItem from './components/SWGSelectItem.svelte';

install();

onMount(function(e) {
	// SWG-Button

	document.body.delegateFor(
		".fieldset[context='swg-button'] .swg-button",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Button");
			console.debug(e.info.data);

			e.info.controller.innerHTML = e.info.controller.getData("value");
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-button'] .swg-button",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Button");
			console.debug(e.info.data);
		}
	);

	// SWG-Textfield

	document.body.delegateFor(
		".fieldset[context='swg-textfield'] .swg-textfield",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Textfield");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-textfield'] .swg-textfield",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Textfield");
			console.debug(e.info.data);
		}
	);

	// SWG-Icon-Textfield

	document.body.delegateFor(
		".fieldset[context='swg-icon-textfield'] .swg-icon-textfield",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Icon-Textfield");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-icon-textfield'] .swg-icon-textfield",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Icon-Textfield");
			console.debug(e.info.data);

			if(!e.info.data.focus) {
				let state
				=
				(e.info.data.value.length === 0 ? "danger" : "default")
				;

				e.source.setData(
					"state",
					state
				);

				let hint = "";

				if(e.info.data.value.length === 0) {
					hint = e.info.controller.getData("placeholder") + " is empty";
				}

				e.source.setData(
					"hint",
					hint
				);
			}
		}
	);

	// SWG-Icon-Password-Textfield

	document.body.delegateFor(
		".fieldset[context='swg-icon-password-textfield'] .swg-icon-password-textfield",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Icon-Password-Textfield");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-icon-password-textfield'] .swg-icon-password-textfield",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Icon-Password-Textfield");
			console.debug(e.info.data);

			if(!e.info.data.focus) {
				let state
				=
				(e.info.data.value.length === 0 ? "danger" : "default")
				;

				e.source.setData(
					"state",
					state
				);

				let hint = "";

				if(e.info.data.value.length === 0) {
					hint = "Password is empty";
				}

				e.source.setData(
					"hint",
					hint
				);
			}
		}
	);
	
	// SWG-Password-Textfield

	document.body.delegateFor(
		".fieldset[context='swg-password-textfield'] .swg-password-textfield",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Password-Textfield");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-password-textfield'] .swg-password-textfield",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Password-Textfield");
			console.debug(e.info.data);

			if(!e.info.data.focus) {
				let state
				=
				(e.info.data.value.length === 0 ? "danger" : "default")
				;

				e.source.setData(
					"state",
					state
				);

				let hint = "";

				if(e.info.data.value.length === 0) {
					hint = "Password is empty";
				}

				e.source.setData(
					"hint",
					hint
				);
			}
		}
	);
	
	// SWG-Numeric-Textfield

	document.body.delegateFor(
		".fieldset[context='swg-numeric-textfield'] .swg-numeric-textfield",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Numeric-Textfield");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-numeric-textfield'] .swg-numeric-textfield",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Numeric-Textfield");
			console.debug(e.info.data);
		}
	);
	
	// SWG-Checkbox

	document.body.delegateFor(
		".fieldset[context='swg-checkbox'] .swg-checkbox",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Checkbox");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-checkbox'] .swg-checkbox",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Checkbox");
			console.debug(e.info.data);
		}
	);
	
	// SWG-Radio-Group

	document.body.delegateFor(
		".fieldset[context='swg-radio-group'] .swg-radio-group",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Radio-Group");
			console.debug(e.info.data);
		}
	);

	document.body.delegateFor(
		".fieldset[context='swg-radio-group'] .swg-radio-group",
		"swg-focuschange",
		function(e) {
			console.debug("\n'swg-focuschange' on SWG-Radio-Group");
			console.debug(e.info.data);
		}
	);
	
	// SWG-Select-Box

	document.body.delegateFor(
		".fieldset[context='swg-select-box'] .swg-select-box",
		"swg-change",
		function(e) {
			console.debug("\n'swg-change' on SWG-Select-Box");
			console.debug(e.info.data);
		}
	);
});

</script>

<svelte:head>
	<title>Solenoid SWG</title>
	<meta charset="utf-8">

	<link rel="stylesheet" href="./resources/fonts/Montserrat/font.css">
	<link rel="stylesheet" href="./resources/graphics/fontawesome-free-5.15.1-web/css/all.css">
</svelte:head>

<svelte:options accessors={true} />

<main>
	<fieldset class="fieldset" context="swg-button">
		<legend>
			SWG-Button
		</legend>
		<div class="content" style="width: 360px;">
			<SWGButton values={["A","B","C","D","E"]}>
				DEFAULT
			</SWGButton>
			<SWGButton type="text" state="primary" values={["A","B","C","D","E"]}>
				PRIMARY
			</SWGButton>
			<SWGButton type="text" state="secundary" values={["A","B","C","D","E"]}>
				SECUNDARY
			</SWGButton>
			<SWGButton type="text" state="danger" values={["A","B","C","D","E"]}>
				DANGER
			</SWGButton>
			<SWGButton type="text" state="warning" values={["A","B","C","D","E"]}>
				WARNING
			</SWGButton>
			<SWGButton type="text" state="info" values={["A","B","C","D","E"]}>
				INFO
			</SWGButton>
			<SWGButton type="text" state="light" values={["A","B","C","D","E"]}>
				LIGHT
			</SWGButton>
			<SWGButton type="text" state="dark" values={["A","B","C","D","E"]}>
				DARK
			</SWGButton>
			<SWGButton type="text" values={["A","B","C","D","E"]} disabled=true>
				DISABLED
			</SWGButton>
		</div>
	</fieldset>

	<fieldset class="fieldset" context="swg-textfield">
		<legend>
			SWG-Textfield
		</legend>
		<div class="content" style="width: 480px;">
			<SWGTextfield label="DEFAULT" placeholder="Layout = T | state=DEFAULT" hint="Hint for state DEFAULT"/>
			<SWGTextfield label="DANGER" placeholder="Layout = T | state=DANGER" state="danger" hint="Hint for state DANGER"/>
			<SWGTextfield label="WARNING" placeholder="Layout = T | state=WARNING" state="warning" hint="Hint for state WARNING"/>
			<SWGTextfield label="INFO" placeholder="Layout = T | state=INFO" state="info"  hint="Hint for state INFO"/>
			<SWGTextfield label="DISABLED" placeholder="Layout = T | DISABLED" disabled=true />
			<SWGTextfield label="READONLY" placeholder="Layout = T | READONLY" readonly=true />
			<SWGTextfield label="BT" layout="BT" placeholder="Layout = BT">
				<div slot="content-before" class="content-before">
					BEFORE
				</div>
			</SWGTextfield>
			<SWGTextfield label="TA" layout="TA" placeholder="Layout = TA">
				<div slot="content-after">
					AFTER
				</div>
			</SWGTextfield>
			<SWGTextfield label="BTA" layout="BTA" placeholder="Layout = BTA">
				<div slot="content-before">
					BEFORE
				</div>
				<div slot="content-after">
					AFTER
				</div>
			</SWGTextfield>
		</div>
	</fieldset>
	
	<fieldset class="fieldset" context="swg-icon-textfield">
		<legend>
			SWG-Icon-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGIconTextfield
				layout="BT"
				iconPosition="left"
				placeholder="Login"
			>
				<div slot="left">
					<i class="fas fa-user"></i>
				</div>
			</SWGIconTextfield>
			<SWGIconTextfield
				layout="BT"
				iconPosition="left"
				placeholder="Email"
			>
				<div slot="left">
					<i class="fas fa-envelope"></i>
				</div>
			</SWGIconTextfield>
			<SWGIconTextfield
				layout="BT"
				iconPosition="left"
				placeholder="Password"
			>
				<div slot="left">
					<i class="fas fa-lock"></i>
				</div>
			</SWGIconTextfield>
		</div>
	</fieldset>
	
	<fieldset class="fieldset" context="swg-icon-password-textfield">
		<legend>
			SWG-Icon-Password-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGIconPasswordTextfield />
		</div>
	</fieldset>

	<fieldset class="fieldset" context="swg-password-textfield">
		<legend>
			SWG-Password-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGPasswordTextfield />
		</div>
	</fieldset>

	<fieldset class="fieldset" context="swg-numeric-textfield">
		<legend>
			SWG-Numeric-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGNumericTextfield controls={false} minValue=1 maxValue=10 />
			<SWGNumericTextfield controls={true} minValue=1 maxValue=10 />
			<SWGNumericTextfield custom={true} controls={false} minValue=1 maxValue=10>
				<div>
					CUSTOM
				</div>
			</SWGNumericTextfield>
			<SWGNumericTextfield custom={true} minValue=1 maxValue=10>
				<div>
					CUSTOM
				</div>
			</SWGNumericTextfield>
		</div>
	</fieldset>

	<fieldset class="fieldset" context="swg-checkbox">
		<legend>
			SWG-Checkbox
		</legend>
		<div class="content" style="width: 400px;">
			<SWGCheckbox>
				<div slot="label">
					DISABLED = FALSE | CHECKED = FALSE
				</div>
			</SWGCheckbox>
			<SWGCheckbox checked={true}>
				<div slot="label">
					DISABLED = FALSE | CHECKED = TRUE
				</div>
			</SWGCheckbox>
			<SWGCheckbox disabled={true}>
				<div slot="label">
					DISABLED = TRUE | CHECKED = FALSE
				</div>
			</SWGCheckbox>
			<SWGCheckbox disabled={true} checked={true}>
				<div slot="label">
					DISABLED = TRUE | CHECKED = TRUE
				</div>
			</SWGCheckbox>
		</div>
	</fieldset>

	<fieldset class="fieldset" context="swg-radio-group">
		<legend>
			SWG-Radio-Group
		</legend>
		<div class="content" style="width: 400px;">
			<SWGRadioGroup>
				<SWGRadio value="Item 1">
					<div slot="label">
						Item 1
					</div>
				</SWGRadio>
				<SWGRadio value="Item 2">
					<div slot="label">
						Item 2
					</div>
				</SWGRadio>
				<SWGRadio value="Item 3">
					<div slot="label">
						Item 3
					</div>
				</SWGRadio>
				<SWGRadio value="Item 4">
					<div slot="label">
						Item 4
					</div>
				</SWGRadio>
			</SWGRadioGroup>
		</div>
	</fieldset>

	<fieldset class="fieldset" context="swg-select-box">
		<legend>
			SWG-Select-Box
		</legend>
		<div class="content" style="width: 400px;">
			<SWGSelectBox
				placeholder="Select an item"
			>
				<SWGSelectItem value="Italy">
					<div slot="label">
						Italy
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="France">
					<div slot="label">
						France
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="Germany">
					<div slot="label">
						Germany
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="Spain">
					<div slot="label">
						Spain
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="China" disabled={true}>
					<div slot="label">
						China
					</div>
				</SWGSelectItem>
			</SWGSelectBox>
			<SWGSelectBox
				placeholder="Disabled"
				disabled={true}
			>
				<SWGSelectItem value="Italy">
					<div slot="label">
						Italy
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="France">
					<div slot="label">
						France
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="Germany">
					<div slot="label">
						Germany
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="Spain">
					<div slot="label">
						Spain
					</div>
				</SWGSelectItem>
				<SWGSelectItem value="China" disabled={true}>
					<div slot="label">
						China
					</div>
				</SWGSelectItem>
			</SWGSelectBox>
		</div>
	</fieldset>
</main>

<style>

:global(*) {
	margin: 0;
	padding: 0;
	outline: none;
	box-sizing: border-box;
	font-family: "Montserrat";
}
:global(body) {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	margin: 0;
	padding: 0;
}
fieldset {
	padding: 10px;
	display: table;
	float: left;
}

fieldset > legend {
	padding: 10px;
	font-weight: 600;
	font-size: 16px;
}

.fieldset[context='swg-checkbox'] .content,
.fieldset[context='swg-radio-group'] .content,
.fieldset[context='swg-select-box'] .content {
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: baseline;
}

</style>