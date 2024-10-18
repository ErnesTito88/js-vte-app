import modalHTML from "./render-modal.html?raw";
import './render-modal.css'


let modal, form;


export const showModal = () => {

    modal?.classList.remove('hide-modal');

}


export const hideModal = () => {

    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @returns 
 */
export const renderModal = ( element ) => {

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

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const formData = new FormData( form );
        const userLike ={};

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
        hideModal();
    });

    element.append( modal );
} 