/*

Versión 1.1 (3/7/2017)
 * Compra automáticamente Builds
 * Compra automáticamente Dealers
 * Compra automáticamente Prestige

Versión 1.0 (30/6/2017)
 * Compra Upgrades automáticamente por el precion más bajo
 * Agrega panel de Autobuy 
 * Opcion de activar o desactivar 
 * Tabla con el orden de compra

*/

function AutoBuy() {  };
var AutoBuy_Version = "1.1";
var Autobuy_estado = true
var compras;
var comprasPrestige;

function Compra(indice, tipo, grupo, precio, nombre, clase) {
	this.indice = indice;
	this.tipo = tipo;
	this.grupo = grupo;
	this.precio = precio;
	this.nombre = nombre;
	this.clase = clase;
}

AutoBuy.init = function () {
	Log("Calling AutoBuy.");
	panelAutobuy();
	prestigeUpdate()
	tabla_panelPrestigeAutoBuy();
	release += " (AutoBuy v" + AutoBuy_Version + ")";
	setInterval(update, 100);
}

function update() {
	compras = []
	
	for (i = 0; i < shootRewardUpgradesOwned.length; i++) {
		if (shootRewardUpgradesOwned[i] == false) { compras.push (new Compra(i, "shoot-reward", "Shoot Reward", shootRewardUpgrades[i].price, shootRewardUpgrades[i].name, "upgrades")); }
	}
	for (i = 0; i < shootTimeUpgradesOwned.length; i++) {
		if (shootTimeUpgradesOwned[i] == false) { compras.push (new Compra(i, "shoot-time", "Shoot Time", shootTimeUpgrades[i].price, shootTimeUpgrades[i].name, "upgrades")); }
	}
	for (i = 0; i < ammoStockUpgradesOwned.length; i++) {
		if (ammoStockUpgradesOwned[i] == false) { compras.push (new Compra(i, "ammo-stock", "Ammo Stock", ammoStockUpgrades[i].price, ammoStockUpgrades[i].name, "upgrades")); }
	}
	for (i = 0; i < reloadTimeUpgradesOwned.length; i++) {
		if (reloadTimeUpgradesOwned[i] == false) { compras.push (new Compra(i, "reload-time", "Reload Time", reloadTimeUpgrades[i].price, reloadTimeUpgrades[i].name, "upgrades")); }
	}
	for (i = 0; i < weedPriceUpgradesOwned.length; i++) {
		if (weedPriceUpgradesOwned[i] == false) { compras.push (new Compra(i, "weed-price", "Weed Price", weedPriceUpgrades[i].price, weedPriceUpgrades[i].name, "upgrades")); }
	}
	for (i = 0; i < methPriceUpgradesOwned.length; i++) {
		if (methPriceUpgradesOwned[i] == false) { compras.push (new Compra(i, "meth-price", "Meth Price", methPriceUpgrades[i].price, methPriceUpgrades[i].name, "upgrades")); }
	}
	for (i = 0; i < cocainePriceUpgradesOwned.length; i++) {
		if (cocainePriceUpgradesOwned[i] == false) { compras.push (new Compra(i, "cocaine-price", "Cocaine Price", cocainePriceUpgrades[i].price, cocainePriceUpgrades[i].name, "upgrades")); }
	}

	for (i = 0; i < weedBuilds.length; i++) {
		compras.push (new Compra(i, 0, "Weed Builds", getBuildPrice(i, 0), weedBuilds[i].name, "builds"));
	}
	for (i = 0; i < methBuilds.length; i++) {
		compras.push (new Compra(i, 1, "Meth Builds", getBuildPrice(i, 1), methBuilds[i].name, "builds"));
	}
	for (i = 0; i < cocaineBuilds.length; i++) {
		compras.push (new Compra(i, 2, "Cocaine Builds", getBuildPrice(i, 2), cocaineBuilds[i].name, "builds"));
	}
	
	for (i = 0; i < weedDealers.length; i++) {
		compras.push (new Compra(i, 0, "Weed Dealers", getDealerPrice(i, 0), weedDealers[i].name, "dealers"));
	}
	for (i = 0; i < methDealers.length; i++) {
		compras.push (new Compra(i, 1, "Meth Dealers", getDealerPrice(i, 1), methDealers[i].name, "dealers"));
	}
	for (i = 0; i < cocaineDealers.length; i++) {
		compras.push (new Compra(i, 2, "Cocainne Dealers", getDealerPrice(i, 2), cocaineDealers[i].name, "dealers"));
	}



	compras.sort(function(a, b) {
		return parseFloat(a.precio) - parseFloat(b.precio);
	});
	
	if ( Autobuy_estado ) {
		$("#autobuy-compra").html("Intentando comprar: <em>'" + compras[0].nombre + "'</em> por <strong>$" + beautify(compras[0].precio, 2) + "</strong>");
		switch (compras[0].clase) {
			case "upgrades":
				Upgrade.buy(compras[0].tipo, compras[0].indice);
				break;
			case "builds":
				Build.buy(compras[0].indice, compras[0].tipo);
				break;
			case "dealers":
				Dealer.buy(compras[0].indice, compras[0].tipo);
				break;
		}
	} else {
		$("#autobuy-compra").html("Autobuy Desactivado");
	}
	tabla_panelAutoBuy();
}

function prestigeUpdate() {
	comprasPrestige = []
	
	for (i = 0; i < prestigeUpgrades.length; i++) {
		if (prestigeUpgradesOwned[i] == false) { comprasPrestige.push (new Compra(i, "drugs", "drugs", prestigeUpgrades[i].price, prestigeUpgrades[i].name, "prestige")); }
	}
	for (i = 0; i < prestigeShoot.length; i++) {
		if (prestigeShootOwned[i] == false) { comprasPrestige.push (new Compra(i, "shoot", "shoot", prestigeShoot[i].price, prestigeShoot[i].name, "prestige")); }
	}
	for (i = 0; i < prestigeShooting.length; i++) {
		if (prestigeShootingOwned == false) { comprasPrestige.push (new Compra(i, "autoshoot", "autoshoot", prestigeShooting[i].price, prestigeShooting[i].name, "prestige")); }
	}
	for (i = 0; i < prestigeReloading.length; i++) {
		if (prestigeReloadingOwned == false) { comprasPrestige.push (new Compra(i, "autoreload", "autoreload", prestigeReloading[i].price, prestigeReloading[i].name, "prestige")); }
	}
	
	comprasPrestige.sort(function(a, b) {
		return parseFloat(a.precio) - parseFloat(b.precio);
	});
	i = 0;
	while (prestige[0] >= comprasPrestige[i].precio) {
		PrestigeUpgrade.buy(comprasPrestige[i].tipo, i)
		i++;
	}

}




function panelAutobuy() {
	var contenido = '';
	contenido += '<div class="panel panel-warning light">';
	contenido += '	<div class="panel-heading">';
	contenido += '		<h3 class="panel-title center">AutoBuy</h3>';
	contenido += '	</div>';
	contenido += '	<div class="panel-body">';
	contenido += '		<div class="col-md-12 col-xs-12">';
	contenido += '			<div class="alert alert-success light center" role="alert"><span id="autobuy-compra"></span></div>';
	contenido += '		</div>';
	contenido += '		<div class="col-md-12 col-xs-12">';
	contenido += '			<div class="well well-sm">';
	contenido += '				<div class="checkbox tiny-font"><label><input type="checkbox" id="act_AutoBuy" onclick="activar_Autobuy();" checked> Autobuy</label></div>';
	contenido += '			</div>';
	contenido += '		</div>';
	contenido += '		<div class="col-md-12 col-xs-12">';
	contenido += '			<p><span id="autobuy-tabla"></span></p>';
	contenido += '			<p><span id="prestige-tabla"></span></p>';
	contenido += '			';
	contenido += '		</div>';
	contenido += '	</div>';
	contenido += '</div>';
	
	
	$('#panels-col').append($(contenido));
}
							

function tabla_panelAutoBuy () {
	var contenido = '';
	contenido += '<table class="table table-striped">';
	contenido += '	<thead>';
	contenido += '	<tr>';
	contenido += '		<th></th>';
	contenido += '		<th>Nombre</th>';
	contenido += '		<th>Tipo</th>';
	contenido += '		<th>Precio</th>';
	contenido += '	</tr>';
	contenido += '	</thead>';
	for (i = 0; i < compras.length; i++) {
		if (i == 0) { nombre = '<strong>' + compras[i].nombre + '</strong>'; }
		else { nombre = compras[i].nombre; }
		contenido += '	<tr>';
		contenido += '		<td>' + i + '</td>';
		contenido += '		<td>' + nombre + '</td>';
		contenido += '		<td>' + compras[i].grupo + '</td>';
		contenido += '		<td>' + beautify(compras[i].precio, 2) + '</td>';
		contenido += '	</tr>';
	}
	contenido += '';
	
	contenido += '</table>';
	$("#autobuy-tabla").html(contenido);
}
function tabla_panelPrestigeAutoBuy () {
	var contenido = '';
	contenido += '<table class="table table-striped">';
	contenido += '	<thead>';
	contenido += '	<tr>';
	contenido += '		<th></th>';
	contenido += '		<th>Nombre</th>';
	contenido += '		<th>Tipo</th>';
	contenido += '		<th>Precio</th>';
	contenido += '	</tr>';
	contenido += '	</thead>';
	for (i = 0; i < comprasPrestige.length; i++) {
		contenido += '	<tr>';
		contenido += '		<td>' + i + '</td>';
		contenido += '		<td>' + comprasPrestige[i].nombre + '</td>';
		contenido += '		<td>' + comprasPrestige[i].grupo + '</td>';
		contenido += '		<td>' + beautify(comprasPrestige[i].precio, 2) + '</td>';
		contenido += '	</tr>';
	}
	
	contenido += '</table>';
	$("#prestige-tabla").html(contenido);
}

function activar_Autobuy () {
	Autobuy_estado = !Autobuy_estado;
}

/*
javascript:(
function(){
	function callback(){
		AutoBuy.init()
	}
	var s=document.createElement("script");
	s.src="js/autobuy.js";
	if(s.addEventListener){
		s.addEventListener("load",callback,false)
	}else if(s.readyState){
		s.onreadystatechange=callback
	}
	document.body.appendChild(s);
}
)()

*/