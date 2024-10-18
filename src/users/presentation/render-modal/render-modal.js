import modalHTML from "./render-modal.html?raw";
import './render-modal.css'
import { User } from "../../models/user";
import { getUserById } from "../../use-cases/get-user-by-id";


let modal, form;
let loadedUser = {};

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {

    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if ( !id ) return;
    const user = await getUserById ( id );
    setFormValues(user);
}


export const hideModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
}
/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActivee;
    loadedUser = user;
}


/**
 * @param {(userLike)=>Promise<Void>} callback
 * @param {HTMLDivElement} element 
 * @returns 
 */
export const renderModal = ( element, callback ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        //console.log(event.target);
        //if (event.target.className !== 'modal-container') return;
        if (event.target.className === 'modal-container') {
            hideModal();
        }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
    
        const formData = new FormData( form );
        const userLike ={ ...loadedUser };

        for (const [key, value] of formData) {
            if ( key === 'balance' ) {
                userLike[key] = +value; //Number[value]
                continue;
            }
            if ( key === 'isActive' ) {
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }
        }
        await callback( userLike );

        hideModal();
    });

    element.append( modal );
} 