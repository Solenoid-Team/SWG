<script>

import { onMount } from 'svelte';

import { install } from '../public/resources/scripts/HTMLUtility';

import SWGButton from './components/SWGButton.svelte';
import SWGTextfield from './components/SWGTextfield.svelte';
import SWGIconTextfield from './components/SWGIconTextfield.svelte';
import SWGPasswordTextfield from './components/SWGPasswordTextfield.svelte';
import SWGNumericTextfield from './components/SWGNumericTextfield.svelte';

let callbacks = {
	"Button": {
		"change": function (e) {
			e.detail.controller.innerHTML = e.detail.data.value;
		}
	}
};

install();

onMount(function(e) {
	document.body.delegateFor(
		".fieldset[context='swg-button'] .swg",
		"swg-change",
		function(e) {
			//console.debug(e);

			console.debug("\nEvent 'swg-change' on SWG-Button");

			console.debug(e.info.data);

			e.info.controller.innerHTML = e.info.data.value;
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

	<!--<fieldset class="fieldset-swg-textfield">
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
	
	<fieldset class="fieldset-swg-icon-textfield fieldset-swg-preset-textfield">
		<legend>
			SWG-Icon-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGIconTextfield icon="fas fa-user" placeholder="Login" />
			<SWGIconTextfield icon="fas fa-envelope" placeholder="Email" maxLength=8 />
			<SWGIconTextfield icon="fas fa-lock" placeholder="Password" />
		</div>
	</fieldset>

	<fieldset class="fieldset-swg-password-textfield fieldset-swg-preset-textfield">
		<legend>
			SWG-Password-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGPasswordTextfield  placeholder="Password" />
		</div>
	</fieldset>

	<fieldset class="fieldset-swg-numeric-textfield fieldset-swg-preset-textfield">
		<legend>
			SWG-Numeric-Textfield
		</legend>
		<div class="content" style="width: 400px;">
			<SWGNumericTextfield layout="T" minValue=1 maxValue=10 />
			<SWGNumericTextfield layout="BT" minValue=1 maxValue=10 />
			<SWGNumericTextfield layout="TA" minValue=1 maxValue=10 />
			<SWGNumericTextfield layout="BTA" minValue=1 maxValue=10 />
			<SWGNumericTextfield layout="BTA" minValue=1 maxValue=10>
				<div slot="content-before">
					CUSTOM
				</div>
			</SWGNumericTextfield>
		</div>
	</fieldset>-->
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

</style>