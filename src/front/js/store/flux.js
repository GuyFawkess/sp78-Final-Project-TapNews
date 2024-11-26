import { account, databases } from "../../../appwriteConfig";
import { ID } from "appwrite";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favouriteNews: [],
			profile: [],
			listuser: [],
			listprofile: [],
			user: [],
			randomUser: [],
			randomProfile: [],
			randomFriends: [],
			friends: [],
			likes: [],
			numberlikes: [],
			news:[],
			files:[],
			topnews: [], 
			token: null,
			users: [],
			filteredUsers: [],
			searchTerm: "",
			pendingFriends: [],
			incomingFriends: [],
			incomingFriendsData: [],
			activeSession: false
		},
		actions: {
			signup: async (username, email, password) => {
				// ESTA LOGICA ES MIA
				const user = await account.create(
					ID.unique(),
					email,
					password,
					username
				);

				const userID = user.$id;
				// HASTA AQUI
				const resp = await fetch(
					`${process.env.BACKEND_URL}/api/signup`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							user_id: userID, //ESTO ES AÑADIDO TAMBIEN
							username: username,
							email: email,
							password: password
						}),
					}
				);
				console.log(resp)
				if (!resp.ok) throw Error("There was a problem in the signup request");

				if (resp.status === 401) {
					throw "Invalid credentials";
				} else if (resp.status === 400) {
					throw "Invalid email or password format";
				}
				const data = await resp.json();
			},
			login: async (email, password) => {
				try {
					const resp = await fetch(
						`${process.env.BACKEND_URL}/api/login`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ email: email, password: password }),
						}
					);

					if (!resp.ok) {
						// Si la respuesta no es 2xx, lanzamos un error general
						throw new Error("usuario o contraseña incorrecta");
					}

					const data = await resp.json();

					if (resp.status === 401) {
						// Si el estado es 401 (credenciales incorrectas), lanzamos un error específico
						throw new Error("Usuario o contraseña incorrectos");
					} else if (resp.status === 400) {
						// Si el estado es 400 (formato incorrecto de email o contraseña)
						throw new Error("Formato de email o contraseña inválido");
					}

					// Si todo está bien, guardamos el token y retornamos los datos
					localStorage.setItem("jwt-token", data.token);
					localStorage.setItem("user_id", data.user_id);
					setStore({activeSession: true})

					return data;
				} catch (error) {
					// En caso de cualquier otro error, lo propagamos
					throw error;
				}
			},

			logout: () => {
				localStorage.removeItem("jwt-token");
				localStorage.removeItem("user_id");
				setStore({ user: null, profile: null, friends: [], activeSession: false });

				console.log("Logout successful!");
			},

			activateSession: () => {
				if(localStorage.getItem('user_id')){
					setStore({activeSession: true})
				}
			},

			addFavouriteNew: async (item) => {
				const user_id = localStorage.getItem("user_id")
				if (!user_id) {
					return
				}
				const news_id = item.uuid
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/saved_news`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							'user_id': user_id,
							'news_id': news_id,
							'img_url': item.image_url
						})
					})
					if (!resp.ok) {
						throw new Error("Failed to save news")
					}
					const store = getStore()
					setStore({ favouriteNews: [...store.favouriteNews, news_id] })
					await getActions().getFavouriteNews()
					
				}
				catch (error) {
					console.log(error)
				}
			},


			addComments: async (news_id, content) => {
				const user_id = localStorage.getItem("user_id"); // Asegúrate de que el user_id esté aquí
				try {
				  // Verifica si el user_id y content están correctamente definidos
				  console.log('Enviando comentario:', { user_id, news_id, content });
			  
				  const response = await fetch(`${process.env.BACKEND_URL}/api/news/${news_id}/comments`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
					  "user_id": user_id,
					  "content": content,
					}),
				  });
			  
				  // Verifica la respuesta
				  if (!response.ok) {
					console.error("Error al agregar comentario:", response.statusText);
					return false;
				  }
			  
				  // Si la solicitud es exitosa, loguea la respuesta
				  const responseData = await response.json();
				  console.log('Respuesta del backend:', responseData);
			  
				  return true;
				} catch (error) {
				  console.error("Error en la solicitud de agregar comentario:", error);
				  return false;
				}
			  },
			  

			getComments: async (news_id) => {
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/news/${news_id}/comments`)
					if (!resp.ok) {
						throw new Error("Failed to access comments")
					}
					const data = await resp.json()
					return data
				}
				catch (error) {
					console.log(error)
				}
			},

			deleteFavouriteNew: async (news_id) => {
				const user_id = localStorage.getItem('user_id')
				const actions = getActions()
				if (!user_id) {
					return
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/saved_news`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							'user_id': user_id,
							'news_id': news_id
						})
					})
					if (!resp.ok) {
						throw new Error('Failed to delete saved news')
					}
					await actions.getFavouriteNews();
				}
				catch (error) {
					console.log(error)
				}
			},

			getFavouriteNews: async (userId) => {
				const id = userId || localStorage.getItem("user_id");
				if (!id) {
				  return;
				}
				try {
				  const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/saved_news`);
				  if (!resp.ok) {
					throw new Error("Failed to access user's saved news");
				  }
				  const data = await resp.json();
				  setStore({ favouriteNews: data });
				} catch (error) {
				  console.log(error);
				}
			  },
			  

			getUserLikes: async () => {
				const id = localStorage.getItem('user_id')
				if (!id) {
					return
				}
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/likes`)
					if (!resp.ok) {
						throw new Error("Failed to access user's likes")
					}
					const data = await resp.json()
					setStore({ likes: data })
				}
				catch (error) {
					console.log(error)
				}
			},

			addLike: async (news_id) => {
				const user_id = localStorage.getItem('user_id')
				if (!user_id) return
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/like`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"user_id": user_id,
							"news_id": news_id
						})
					})
					if (!resp.ok) {
						throw new Error("Failed to add like")
					}
					const store = getStore()
					setStore({ likes: [...store.likes, news_id] })
				}
				catch (error) {
					console.log(error)
				}
			},

			getNumberLike: async (news_id) => {
				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/news/${news_id}/likes`)
					if (!resp.ok) {
						throw new Error("Failed in likes account")
					}
					const data = await resp.json()
					setStore ({numberlikes: data })
				}
				catch (error) {
					console.log(error)
				}
			},

			deleteLike: async (news_id) => {
				const user_id = localStorage.getItem('user_id')
				if (!user_id) return
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/like`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"user_id": user_id,
							"news_id": news_id
						})
					})
					if (!resp.ok) {
						throw new Error("Failed to delete like")
					}
					const store = getStore()
					setStore({ likes: store.likes.filter((id) => id !== news_id) })
				}
				catch (error) {
					console.log(error)
				}
			},

			getSingleNew: async (uuid) => {
				try {
					const response = await fetch(`${process.env.DOMAIN_API}/uuid/${uuid}?api_token=${process.env.API_TOKEN}`);
					if (!response.ok) {
						throw new Error("La respuesta no fue exitosa");
					}

					const data = await response.json();
					setStore({ news: data });
				} catch (error) {
					console.error("Error fetching news:", error);
				}
			},

			getNews: async () => {
				try {
				  const response = await fetch(`${process.env.DOMAIN_API}/headlines?locale=es&language=es&api_token=${process.env.API_TOKEN}`);				  
				  if (!response.ok) {
					throw new Error("La respuesta no fue exitosa");
				  }
				  const data = await response.json();
				  console.log('Datos de noticias:', data); 
				  const categories = [
					'general', 'science', 'sports', 'business', 'health', 
					'entertainment', 'tech', 'politics', 'food', 'travel'
				  ];
				  let allNews = [];
				  categories.forEach(category => {
					if (data.data[category]) {
					  allNews = [...allNews, ...data.data[category]];
					}
				  });
				  setStore({ topnews: allNews });
				  console.log('Nuevo estado de topnews:', allNews); 
				} catch (error) {
				  console.log("Error al cargar noticias", error);
				}
			  },
			  

	
			getProfile: async (profile_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/profile/${profile_id}`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ profile: data })
				} catch (error) {
					console.log("Not profile found", error)
				}
			},
			getRandomProfile: async (profile_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/profile/${profile_id}`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ randomProfile: data })
				} catch (error) {
					console.log("Not profile found", error)
				}
			},


			modifyProfile: async (userId, updatedProfile) => {
				try {

					const response = await fetch(`${process.env.BACKEND_URL}/api/profile/${userId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedProfile),
					});

					if (!response.ok) {
						throw new Error("Error al actualizar el perfil");
					}

					const updatedData = await response.json();


					setStore({
						profile: updatedData,
					});
					
					console.log("Perfil actualizado con éxito:", updatedData);
				} catch (error) {
					console.error("Error al modificar el perfil:", error);
				}
			},

			getUser: async (user_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ user: data })
				} catch (error) {
					console.log("Not user found", error)
				}
			},
			getRandomUser: async (user_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ randomUser: data })
				} catch (error) {
					console.log("Not user found", error)
				}
			},
			getFriends: async (user_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/friends`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ friends: data.friends })
				} catch (error) {
					console.log("Not friends found", error)
				}
			},
			getRandomFriends:
			async (user_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/friends`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ randomFriends: data.friends })
				} catch (error) {
					console.log("Not friends found", error)
				}
			},

			getUserPendingFriends: async(user_id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/friends/pending`)
					if (!resp.ok){
						throw new Error("Error trayendo amistades pendientes del usuario")
					}
					const data = await resp.json()
					setStore({pendingFriends: data.pending_friends})
				}
				catch(error) {
					console.log(error)
				}
			},

			getUserIncomingFriends: async(user_id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/friends/incoming`)
					if (!resp.ok){
						throw new Error("Error trayendo amistades pendientes del usuario")
					}
					const data = await resp.json()
					setStore({incomingFriends: data.incoming_friends})
					const actions = getActions()
					const allUsers = await actions.getAllUsers()
					const allProfiles = await actions.getAllProfiles()
					const incomingFriendsData = data.incoming_friends.map(friendId => {
						const user = allUsers.find(u => u.id === friendId);
						const profile = allProfiles.find(p => p.user_id === friendId);			
						return {
							id: friendId,
							username: user.username,
							img_url: profile.img_url
						};
					});
					setStore({ incomingFriendsData });					
				}
				catch(error) {
					console.log(error)
				};
			},

			getAllUsers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({listuser: data})
					return data
				}catch(error){
					console.log("Not users found", error)
				}
			},

			getFilterUser: (filter) => {
				const store = getStore();
			  
				if (filter === "") {
				  // Si el filtro está vacío, muestra todos los usuarios
				  return store.listuser
				} else {
				  // Filtra los usuarios que coincidan con el término de búsqueda
				  const filteredUsers = store.listuser.filter((user) =>
					user.username.toLowerCase().includes(filter.toLowerCase())
				//   console.log(user.username)}
				  );
				//   console.log(filter)				  
				  return filteredUsers
				  // Actualiza el store con los usuarios filtrados
				//   setStore({ users: filteredUsers });
				}
			  },
			  
			  
			getAllProfiles: async() => {
				try{
					const response = await fetch (`${process.env.BACKEND_URL}/api/profiles`)
					if (!response.ok) {
						throw new Error("La respuesta no fue existosa");
					}
					const data = await response.json()
					setStore({ listprofile: data })
					return data
				} catch (error) {
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
				} catch (error) {
					console.log('Error al eliminar la amistad:', error);
				}
				try {
					const dataReverse = {
						user_id: friendId,
						friend_id: userId
					};
					const resp = await fetch(`${process.env.BACKEND_URL}/api/friendship`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(dataReverse)
					});

					if (!resp.ok) {
						throw new Error('Error al eliminar la amistad');
					}
				} catch (error) {
					console.log('Error al eliminar la amistad:', error);
			}},

			deleteFriendRequest: async(user_id, friend_id) => {
				try {
					const data = {
						user_id: user_id,
						friend_id: friend_id
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/friendship`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					});

					if (!response.ok) {
						throw new Error('Error al eliminar la solicitud');
					}
				} catch (error) {
					console.log('Error al eliminar la solicitud:', error);
				}
			},

			addFriend: async (user_id, friend_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/friendship`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ user_id, friend_id })
					});
					if (response.ok) {
						const newFriend = { 'user_id': user_id, 'friend_id': friend_id };
						const store = getStore();
						setStore({
							friends: [...store.friends, newFriend],
						});
					} else {
						console.error("No se pudo añadir el amigo");
					}
				} catch (error) {
					console.error("Error al añadir el amigo:", error);
				}
			},

			getMyTasks: async () => {
				// Recupera el token desde la localStorage
				const token = localStorage.getItem("jwt-token");

				const resp = await fetch(
					`${process.env.BACKEND_URL}/api/users`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token, //authorization token
						},
					}
				);

				if (!resp.ok) {
					throw Error("There was a problem in the login request");
				} else if (resp.status === 403) {
					throw Error("Missing or invalid token");
				} else {
					throw Error("Unknown error");
				}
			},

		},
	};
};

export default getState;
