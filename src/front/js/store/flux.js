const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			favouriteNews: [],
			profile:[],
			listuser:[],
			listprofile:[],
			user:[],
			friends:[],
			userexample: [
				{
				  "username": "JaneDoe",
				  "user_id": 1,
				  "description": "Desarrolladora de software y amante de la inteligencia artificial. Me encanta aprender nuevas tecnologías y enseñar a otros.",
				  "img_url": "https://avatars.githubusercontent.com/u/32409832?v=4"
				},
				{
				  "username": "CarlosCoder",
				  "user_id": 2,
				  "description": "Backend Developer. Entusiasta de Python y el aprendizaje automático. Siempre en busca de mejorar mis habilidades.",
				  "img_url": "https://avatars.githubusercontent.com/u/5765686?v=4"
				},
				{
				  "username": "MariaAI",
				  "user_id": 3,
				  "description": "Investigadora en Inteligencia Artificial. Creando soluciones innovadoras con algoritmos avanzados.",
				  "img_url": "https://avatars.githubusercontent.com/u/5403899?v=4"
				},
				{
				  "username": "TechTommy",
				  "user_id": 4,
				  "description": "Desarrollador Frontend y apasionado por la experiencia de usuario. Siempre experimentando con nuevas librerías y frameworks.",
				  "img_url": "https://avatars.githubusercontent.com/u/28462170?v=4"
				},
				{
				  "username": "NinaNovice",
				  "user_id": 5,
				  "description": "Programadora novata con interés en el desarrollo web. Buscando mejorar mis habilidades todos los días.",
				  "img_url": "https://avatars.githubusercontent.com/u/50960772?v=4"
				},
				{
				  "username": "LuisTech",
				  "user_id": 6,
				  "description": "Ingeniero de software con experiencia en aplicaciones móviles. Entusiasta del diseño de interfaces y el desarrollo ágil.",
				  "img_url": "https://avatars.githubusercontent.com/u/1936746?v=4"
				},
				{
				  "username": "SaraData",
				  "user_id": 7,
				  "description": "Data Scientist enfocada en Big Data y visualización de datos. Mi objetivo es encontrar patrones que cambien el mundo.",
				  "img_url": "https://avatars.githubusercontent.com/u/10394380?v=4"
				},
				{
				  "username": "RoboRico",
				  "user_id": 8,
				  "description": "Apasionado por la robótica y la automatización. Actualmente desarrollando proyectos con Raspberry Pi y Arduino.",
				  "img_url": "https://avatars.githubusercontent.com/u/7587480?v=4"
				},
				{
				  "username": "EmmaUX",
				  "user_id": 9,
				  "description": "Diseñadora UX/UI. Mi trabajo es crear interfaces simples y accesibles para todos. Estoy en constante búsqueda de nuevas tendencias de diseño.",
				  "img_url": "https://avatars.githubusercontent.com/u/146219?v=4"
				}
			  ],
			topnews: [
					{
					"uuid": "7834e499-15eb-46dd-a1ce-ecb479bbb2a2",
					"title": "Última Hora de la DANA, en directo | El Gobierno aprueba un nuevo paquete de ayudas",
					"description": "Hasta 32 personas continúan desaparecidas aún en la Comunidad Valenciana tras el paso de la DANA. Los efectivos de búsqueda se centran ahora en la zona de La Albufera donde aún vehículos y enseres permanecen enterrados.",
					"keywords": "",
					"snippet": "Las labores de búsqueda de desaparecidos continúan en las localidades más afectadas por la DANA. Los voluntarios llegados de toda España se suman a los efec...",
					"url": "https://www.antena3.com/noticias/el-tiempo/actualidad/ultima-hora-dana-efectivos-rescate-centran-albufera-localizar-desaparecidos_202411116731b1606566420001a09905.html",
					"image_url": "https://fotografias.antena3.com/clipping/cmsimages02/2024/11/11/80FA65D7-022E-4D26-B596-F262616E279A/zona-albufera_69.jpg?crop=1280,720,x0,y60&width=1280&height=720&optimize=low&format=jpg",
					"language": "es",
					"published_at": "2024-11-11T11:30:45.000000Z",
					"source": "antena3.com",
					"categories": [],
					"relevance_score": null,
					"locale": "es"
					},
					{
					"uuid": "bab0a2b6-bab1-4e9e-a620-0ce1867c3252",
					"title": "Comienza en Bakú la COP29 marcada por la ausencia de las grandes potencias",
					"description": "Casi 200 países de todo el mundo se reúnen en la capital de Azerbaiyán para debatir medidas que aborden la emergencia climática. No estará Biden, ni Putin, ni los presidentes de China o Brasil",
					"keywords": "",
					"snippet": "Serán en total 11 días en los que debatir, otra vez, sobre el cambio climático, hacer autocrítica, sería lo deseable, y decidir las acciones a tomar para n...",
					"url": "https://www.antena3.com/noticias/mundo/comienza-baku-cop29_202411116731d4d16566420001a0b63d.html",
					"image_url": "https://fotografias.antena3.com/clipping/cmsimages02/2024/11/11/79385167-A19B-4E95-B2D7-0C8D80C3071A/comienza-baku-cop29_69.jpg?crop=2112,1188,x0,y62&width=1280&height=720&optimize=low&format=jpg",
					"language": "es",
					"published_at": "2024-11-11T11:19:05.000000Z",
					"source": "antena3.com",
					"categories": [],
					"relevance_score": null,
					"locale": "es"
					},
					{
					"uuid": "92e3af08-d632-4fb3-ad35-184ca92f4c8e",
					"title": "Cuánto se lleva hacienda por cada premio del Sorteo del ONCE del ONCE",
					"description": "Consulta aquí cuánto se lleva Hacienda por cada premio del Sorteo 11 del 11 de la ONCE, el sorteo con la fecha más especial.",
					"keywords": "",
					"snippet": "El 11 de noviembre es una fecha marcada por la ilusión para miles de jugadores. El Sorteo 11 del 11 de la ONCE es uno de los sorteos extraordinarios más esper...",
					"url": "https://www.antena3.com/noticias/loterias/cuanto-lleva-hacienda-cada-premio-sorteo-once-once-11-noviembre_202411116731e6596566420001a0c79a.html",
					"image_url": "https://fotografias.antena3.com/clipping/cmsimages02/2024/11/11/1182086C-E0ED-46C6-A264-61B3C18FC715/cuanto-lleva-hacienda-cada-premio-sorteo-once-once_69.jpg?crop=1600,900,x0,y0&width=1280&height=720&optimize=low&format=jpg",
					"language": "es",
					"published_at": "2024-11-11T11:12:37.000000Z",
					"source": "antena3.com",
					"categories": [],
					"relevance_score": null,
					"locale": "es"
					},
					{
					"uuid": "c8a12f3f-b6b7-4766-bd9e-0c5ba09fd69b",
					"title": "Bitcoin bate récords con 80.000 dólares, impulsado por la victoria de Trump",
					"description": "El precio de bitcoin alcanzó un máximo histórico el domingo, continuando su aumento posterior a las elecciones, ya que el presidente electo Donald Trump",
					"keywords": "",
					"snippet": "El precio de bitcoin alcanzó un máximo histórico el domingo, continuando su aumento posterior a las elecciones, ya que el presidente electo Donald Trump ha p...",
					"url": "https://forbes.es/criptomonedas/540993/bitcoin-bate-records-80-000-dolares-victoria-trump/",
					"image_url": "https://forbes.es/wp-content/uploads/2024/11/960x0.webp",
					"language": "es",
					"published_at": "2024-11-11T09:21:45.000000Z",
					"source": "forbes.es",
					"categories": [
					"business"
					],
					"relevance_score": null,
					"locale": "es"
					},
					{
					"uuid": "23cff728-4c81-49e9-9b18-cf99f70dfcf7",
					"title": "El futuro de Griezmann apunta a estar muy lejos del Atlético de Madrid",
					"description": "Antoine Griezmann podría estar viviendo sus últimas semanas como jugador del Atlético de Madrid",
					"keywords": "",
					"snippet": "Apuesta a este partido aquí La Liga 1 X 2 La Liga Valladolid Atletico Madrid 5.00 3.50 1.73\n\nAntoine Griezmann, una de las figuras más icónicas del Atlético...",
					"url": "https://www.fichajes.net/noticias/futuro-griezmann-apunta-lejos-atletico-madrid-20241111.html",
					"image_url": "https://www.fichajes.net/sites/default/files/styles/epsa_detail_thumbail/public/2024-11/futuro-griezmann-apunta-estar-muy-lejos-atletico-madrid.jpg?h=df3c6bf4&itok=bDhMNqEd",
					"language": "es",
					"published_at": "2024-11-11T09:15:00.000000Z",
					"source": "fichajes.net",
					"categories": [
					"sports"
					],
					"relevance_score": null,
					"locale": "es"
					}, 
					{
					"uuid": "5a0d63ad-a801-4d99-9962-34a2efeb2629",
					"title": "El Real Madrid le confirma a Ancelotti su primer fichaje de enero",
					"description": "El equipo merengue va a acudir al mercado de fichajes de enero para reforzar su primera plantilla, Florentino ha confirmado el primer refuerzo",
					"keywords": "",
					"snippet": "Apuesta a este partido aquí La Liga 1 X 2 La Liga Real Madrid Getafe 1.42 5.25 5.75\n\nEl Real Madrid se enfrenta nuevamente a una temporada complicada en cuanto...",
					"url": "https://www.fichajes.net/noticias/real-madrid-le-confirma-ancelotti-primer-fichaje-enero-20241111.html",
					"image_url": "https://www.fichajes.net/sites/default/files/styles/epsa_detail_thumbail/public/2024-11/El-Real-Madrid-le-confirma-a-Ancelotti-su-primer-fichaje-de-enero.jpg?h=ff0d7aa2&itok=SCxsel2J",
					"language": "es",
					"published_at": "2024-11-11T15:31:00.000000Z",
					"source": "fichajes.net",
					"categories": [
					"sports"
					],
					"relevance_score": null,
					"locale": "es"
					},
					{
					"uuid": "9bb7ea81-9c14-4c7b-8940-29dcf71e7dc8",
					"title": "Sumar hace oídos sordos y pospone el cambio de marca",
					"description": "Sumar ha evitado valorar el contenido del libro de la eurodiputada, Irene Montero, que carga contra Yolanda Díaz.",
					"keywords": "irene montero, podemos, psoe, sumar, yolanda diaz",
					"snippet": "Sumar tiene pendiente la reestructuración de la dirección del partido, bajo un liderazgo colegiado e interino compuesto por Lara Hernández, Elizabeth Duval, ...",
					"url": "https://www.libertaddigital.com/espana/politica/2024-11-11/sumar-hace-oidos-sordos-y-pospone-el-cambio-de-marca-7185188/",
					"image_url": "https://s.libertaddigital.com/2024/11/11/1200/627/ld/dsc0960.jpg",
					"language": "es",
					"published_at": "2024-11-11T15:13:54.000000Z",
					"source": "libertaddigital.com",
					"categories": [
					"general"
					],
					"relevance_score": null,
					"locale": "es"
					},
					{
					"uuid": "674207df-4662-4ced-8483-2bf140f007e3",
					"title": "Fears for missing 15-year-old girl in Spain: Nicole vanished from major city over two weeks ago",
					"description": "A NATIONWIDE appeal has been launched to track down a missing 15-year-old girl. Nicole M.S. (pictured above) has been not been seen since October 23,",
					"keywords": "",
					"snippet": "A NATIONWIDE appeal has been launched to track down a missing 15-year-old girl.\n\nNicole M.S. (pictured above) has been not been seen since October 23, according...",
					"url": "https://www.theolivepress.es/spain-news/2024/11/11/fears-for-missing-15-year-old-girl-in-spain-nicole-vanished-from-major-city-over-two-weeks-ago/",
					"image_url": "https://www.theolivepress.es/wp-content/uploads/2024/11/missing-nicole.webp",
					"language": "en",
					"published_at": "2024-11-11T15:09:00.000000Z",
					"source": "theolivepress.es",
					"categories": [
					"general"
					],
					"relevance_score": null,
					"locale": "es"
					},{
						"uuid": "3ed16af7-5d66-4442-a414-058e28f9ad82",
						"title": "El precio del avión, al alza: los fletes crecen a doble dígito en octubre",
						"description": "A pesar de la rápida solución a las huelgas de los estibadores en algunos puertos de Estados Unidos, el precio de los fletes de carga aérea ha seguido…",
						"keywords": "",
						"snippet": "En octubre, el precio de los fletes aéreos entre Europa y Norteamérica aumentaron un 11%, según los datos de la plataforma de análisis de demanda marítima ...",
						"url": "https://www.modaes.com/entorno/el-precio-del-avion-al-alza-los-fletes-crecen-a-doble-digito-en-octubre",
						"image_url": "https://www.modaes.com/thumb/eyJ0IjoiZCIsInciOjEyMDAsImgiOjY3NSwibSI6MSwidiI6IjEuNi43In0/files/2024/13-recursos/maersk-contenedores-camion-980.jpg",
						"language": "es",
						"published_at": "2024-11-12T16:43:31.000000Z",
						"source": "modaes.es",
						"categories": [
						"entertainment"
						],
						"relevance_score": null,
						"locale": "es"
						},
						{
						"uuid": "a487713c-50db-4c9c-b2da-12ba11a3db88",
						"title": "Extreme caution is advised in Malaga over incoming storms: Residents on the Costa del Sol are told to close windows and shutters during deluge tonight",
						"description": "COSTA del Sol residents are bracing themselves for incoming DANA storms as landlords warn tenants to batten down the hatches. After witnessing the",
						"keywords": "",
						"snippet": "COSTA del Sol residents are bracing themselves for incoming DANA storms as landlords warn tenants to batten down the hatches.\n\nAfter witnessing the destruction ...",
						"url": "https://www.theolivepress.es/spain-news/2024/11/12/extreme-caution-is-advised-in-malaga-over-incoming-storms-residents-on-the-costa-del-sol-are-told-to-close-windows-and-shutters-during-deluge-tonight-as-expats-fear-repeat-of-historic-2016-floods/",
						"image_url": "https://www.theolivepress.es/wp-content/uploads/2024/11/464783350_8719006728158853_196144836466269578_n.jpg",
						"language": "en",
						"published_at": "2024-11-12T16:30:00.000000Z",
						"source": "theolivepress.es",
						"categories": [
						"general"
						],
						"relevance_score": null,
						"locale": "es"
						},
						{
						"uuid": "dd3f414a-30aa-48f3-8f1a-521db565ea8b",
						"title": "Climate change is behind deadly DANA floods in Valencia, says Spain’s Pedro Sanchez",
						"description": "PRIME Minister Pedro Sanchez has resoundingly blamed climate change for the DANA weather fronts that caused at least 220 deaths from flooding in Spain-",
						"keywords": "",
						"snippet": "PRIME Minister Pedro Sanchez has resoundingly blamed climate change for the DANA weather fronts that caused at least 220 deaths from flooding in Spain- mainly i...",
						"url": "https://www.theolivepress.es/spain-news/2024/11/12/climate-change-is-behind-deadly-dana-floods-in-valencia-says-spains-pedro-sanchez/",
						"image_url": "https://www.theolivepress.es/wp-content/uploads/2024/11/Spains-Pedro-Sanchez-blames-climate-change-for-flood-disaster-and-220-deaths-during-COP29-speech-scaled.jpg",
						"language": "en",
						"published_at": "2024-11-12T16:30:00.000000Z",
						"source": "theolivepress.es",
						"categories": [
						"general"
						],
						"relevance_score": null,
						"locale": "es"
						}
					],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null,
			users: []
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			addUser: (email, password) => {
				const store = getStore();
				const newUser = { email, password }; // Crear un objeto de usuario
				const updatedUsers = [...store.users, newUser];
				setStore({ users: updatedUsers });
				localStorage.setItem("users", JSON.stringify(updatedUsers));
			  },

			  login : async (email, password) => {
				const resp = await fetch(`https://obscure-pancake-x599pr4vr6vq366v-3001.app.github.dev/token`, { 
					 method: "POST",
					 headers: { "Content-Type": "application/json" },
					 body: JSON.stringify({ email: email, password: password }) 
				})
		   
				if(!resp.ok) throw Error("There was a problem in the login request")
		   
				if(resp.status === 401){
					 throw("Invalid credentials")
				}
				else if(resp.status === 400){
					 throw ("Invalid email or password format")
				}
				const data = await resp.json()
				// Guarda el token en la localStorage
				// También deberías almacenar el usuario en la store utilizando la función setItem
				localStorage.setItem("jwt-token", data.token);
		   
				return data
		   },

			getMyTasks : async () => {
				// Recupera el token desde la localStorage
				const token = localStorage.getItem('jwt-token');
		   
				const resp = await fetch(`https://obscure-pancake-x599pr4vr6vq366v-3001.app.github.dev/api/users`, {
				   method: 'GET',
				   headers: { 
					 "Content-Type": "application/json",
					 'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
				   } 
				});
		   
				if(!resp.ok) {
					 throw Error("There was a problem in the login request")
				} else if(resp.status === 403) {
					 throw Error("Missing or invalid token");
				} else {
					throw Error("Unknown error");
				}
		   
				
		   },

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			addFavouriteNew: (item) => {
				const store = getStore();
				const arrayFavoritos = store.favouriteNews
				if (!arrayFavoritos.includes(item)){
				setStore({ favouriteNews: [...store.favouriteNews, item] })
				console.log(store.favouriteNews)
				}
				else 
					console.log("Don´t repeat favourite")
			},

			deleteFavouriteNew: (indexid) => {
				const store = getStore();
				store.favouriteNews = store.favouriteNews.filter((_, index) => index !== indexid);
				setStore ({ favouriteNews: [...store.favouriteNews]})
			}, 

		/*	getNews: async() => {
				try{
					const response = await fetch (process.env.DOMAIN_API+"/v1/news/top?api_token="+ process.env.API_TOKEN+"locale=es&limit=3")
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({topnews: data.data})
					console.log(topnews)
				}catch(error){
					console.log("Not found news", error)
				}
			}, */

			getProfile: async(profile_id) => {
				try{
					const response = await fetch (`${process.env.BACKEND_URL}/api/profile/${profile_id}`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({profile: data})
					console.log(profile)
				}catch(error){
					console.log("Not profile found", error)
				}
			},

			getUser: async(user_id) => {
				try{
					const response = await fetch (`${process.env.BACKEND_URL}/api/user/${user_id}`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({user: data})
					console.log(user)
				}catch(error){
					console.log("Not user found", error)
				}
			},

			getFriends: async(user_id) => {
				try{
					const response = await fetch (`${process.env.BACKEND_URL}/api/user/${user_id}/friends`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({friends: data.friends})
					console.log(friends)
				}catch(error){
					console.log("Not friends found", error)
				}
			},

			getAllUsers: async() => {
				try{
					const response = await fetch (`${process.env.BACKEND_URL}/api/users`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({listuser: data})
					console.log(listuser)
				}catch(error){
					console.log("Not users found", error)
				}
			},


			getAllProfiles: async() => {
				try{
					const response = await fetch (`${process.env.BACKEND_URL}/api/profiles`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({listprofile: data})
					console.log(listprofile)
				}catch(error){
					console.log("Not users found", error)
				}
			},

			deleteFriend: async (userId, friendId) => {
				try {
					const data = {
						user_id: userId,
						friend_id: friendId
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/friendship`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json' 
						},
						body: JSON.stringify(data) 
					});
			
					if (!response.ok) {
						throw new Error('Error al eliminar la amistad');
					}
					const result = await response.json();
					console.log('Resultado:', result);
				} catch (error) {
					console.log('Error al eliminar la amistad:', error);
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
