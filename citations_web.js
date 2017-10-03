// // Les phrases préparées sont des phrases composées -> Sujet1 + Verb1 + Complement1 + Conjonction de coordination + Sujet2 + Verbe2 + Complement2       plus le prenom et le nom de l'auteur

var p1=["les américains","mangent","des hamburgers","et","leurs fourgonnettes","sont","énormes",
		"John","Smith"];

var p2=["les belges","raffollent","des frites","pourtant","leurs pommes de terres","restent","rondes",
		"Jeanne","Pablo"];

var p3=["les allemands","sont fous","des bières","ainsi","leurs vessies","sont","pleines ",
		"Juan","Syncope"];

var p4=["les algériens","font mijoter","de la chorba","alors que","leurs marmittes","paraissent","vieilles",
		"Victor","Hugo"];

var p5=["les français","dégustent","des escargots","donc","les grenouilles","sont","jalouses",
		"Jean","Pascal"];

var p6=["les japonais","adorent préparer","des sushis","ceci dit","leurs lames","deviennent","usées",
		"Jimmy","Soderbergh"];

var p7=["les chinois","conduisent","des pousse-pousse","bien que","leurs voitures","semblent","parfaites",
		"Michael","Jackson"];

var p8=["les russes","distillent","de la vodka","du coup","les routes","sont","accidentées",
		"Elodie","Dupuis"];

var p9=["les australiens","fabriquent","des planches de surfs","car","leurs vagues","sont","géantes",
		"Myrtille","Escobar"];

// //Initialisation des variables
var phrases= [p1,p2,p3,p4,p5,p6,p7,p8,p9],      	// tableau à 2 dimensions contenant les tableaux de citations decoupées en 7 parties + auteur		
	citation="";									// initialise citation a chaine vide

function randNb(min, max) {   						// retourne un nombre aleatoire dans un intervalle donné
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}
		
function typeDeux(choixGen){               	//Choix2 insere un mot du tableau pAjout
	var choixD="";							// initialise la variable à retourner
	//On ajoute des mots en plus à la fin de chaque morceaux de phrases
	var pAjout=["Pardon !","Euh ?","Ah bon !","OK !","Nan !","Cool !","C'est pas vrai ?!","Ciao !","Même pas vrai !","S'il vous plaît !","Avec plaisir !","Encore !","Si si !","C'est pas moi !"];
	// si choix === type 2 -> on choisit un mot dans le tableau aléatoirement sinon renvoie chaine vide
	choixGen===2 ? choixD = " <span class=\"ajout\">"+pAjout[randNb(0,pAjout.length-1)]+"</span>" : choixD = ""
	return choixD
}
function typeTrois(choixGen, inc){             		//Choix3 modifie l'ordre d'apparition des morceaux
	var choixT=inc;									// initialise la variable à retourner à 0 // attention chengemnt de '' à inc
	//On modifie l'ordre d'apparition des indices du tableau pour parler de façon plus distingué
	var pAnastrophe=[2,0,1,3,6,4,5];
	// si choix === type 3 -> renvoie la valeur de l'indice du tableau pAnastrophe sinon renvoie la valeur de la boucle par défaut (= type 1)
	choixGen===3 ? choixT = pAnastrophe[inc] : choixT = inc
	return choixT
}

function afficher(choixGen){      //compose et renvoie la citation avec les valeurs retournées de type2 et 3 ou chaine vide
	// construction de la variable citation au fur et à mesure
	citation="<blockquote><p class=\"blocCitation\"> ";

	for(var i=0;i<7;i++){	//Phrases composees -- Suj1 Verb1 Compl1 Coord Suj2 Verb2 Compl2 -- phrase type
		//on recupere un tableau phrase(p1 p2....) dans le tableau phrases et on selectionne l'indice à renvoyer selon type 1 ou type 3, puis appel type 2
		citation += phrases[randNb(0,phrases.length-1)][typeTrois(choixGen,i)]+typeDeux(choixGen)+" ";
	}

	citation+= "<br/><span class=\"auteur\">par ";

	for(var i=0;i<=1;i++){	// prenom   nom   de l'auteur
		citation += phrases[randNb(0,phrases.length-1)][randNb(7,8)]+" ";
	}

	citation+="</span></p></blockquote>";
	return citation;
}


var expand = document.getElementById("expand");		//cible l'élément #expand   correspond à la commande d'ouverture / fermeture du prog
var content = document.getElementById("content");	//cible l'élément #content  la où sont affichés les citations

expand.addEventListener("click",function(e){		//ecoute l'évènement click sur #expand
	
	var endMessage = document.getElementById("endMessage");		// message à bientôt
	var container = document.getElementById("container");		// div à afficher ou masquer via #expand

	if(e.target.innerHTML==="+"){
		e.target.innerHTML="-";
		endMessage.innerHTML="";
		container.style.display="block";
	}else{
		e.target.innerHTML="+";
		endMessage.innerHTML="A bientôt !"
		container.style.display="none";
		content.innerHTML="";
	}

},false);

var form = document.querySelector("#form1");		// cible le formulaire

form.addEventListener("submit",function(e){			// ecoute l'évènement submit sur le bouton submit
	e.preventDefault();								// empêche l'envoi du formulaire
	content.innerHTML="";
	var nb = document.querySelector("input[type=radio]:checked");		// cible le bouton radio sélectionné
	var type = document.getElementById("type");							// cible la liste select

	if(nb){																// si il y a au moins un bouton radio coché (1 par défaut)								
		nb=parseInt(nb.value);											// combien de ciations
		type=parseInt(type.options[type.selectedIndex].value);			// quel type de citation

		for(var i=1;i<=nb;i++){											// boucle sur le nombre de citation à générer
			afficher(type);												// appel la fonction qui va composer une citation
			content.innerHTML+=citation;								// insere la variable citation dans #content
		}
	}
	
},false);