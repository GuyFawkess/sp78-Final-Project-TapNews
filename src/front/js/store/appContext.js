import React, { useState, useEffect } from "react";
import getState from "./flux.js";


// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

        
		// useEffect(() => {
		// 	const news_list = state.store.topnews
        //     const postNews = async () => {
        //         try {
        //             await Promise.all(
        //                 news_list.map(news => 
        //                     fetch(`${process.env.BACKEND_URL}/api/news`, {
        //                         method: 'POST',
        //                         headers: {
        //                             'Content-Type': 'application/json',
        //                         },
        //                         body: JSON.stringify(news),
        //                     })
        //                     .then(resp => {
        //                         if (!resp.ok) {
        //                             throw new Error('Error posting news to the database');
        //                         }
        //                         return resp.json();
        //                     })
        //                     .then(() => {
        //                         console.log('Successfully added news to the database');
        //                     })
        //                 )
        //             );
        //         } catch (error) {
        //             console.error('Failed to add some news to the database:', error);
        //         }
        //     };
    
        //     postNews();
                
		// }, [])

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
