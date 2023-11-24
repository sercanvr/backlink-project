const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const websiteName = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');
const backLinkForm = document.getElementById('backlink-form');
const backLinksContainer = document.getElementById('backlinks-container');

let backlinks = [];

function showModal() {
    modal.classList.add('show-modal');
    websiteName.focus();
}


function validate(nameValue, urlValue) {
    const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
    const regex = new RegExp(expression);

    if (!nameValue || !urlValue) 
    {
    alert('Please fill in the required fields!');
    return false;
    }

    if (!urlValue.match(regex)) 
    {
    alert('Please enter a valid website address!');
    return false;
    }
    return true;
}

function deleteBacklink(url) {
    const clickedItem = event.target.closest('.item');
    if (!clickedItem) return;

    const indexToDelete = Array.from(backLinksContainer.children).indexOf(clickedItem);

    if (indexToDelete !== -1) {
        backlinks.splice(indexToDelete, 1);
        localStorage.setItem('backlinks', JSON.stringify(backlinks));
        fetchBacklinks();
    }
};

function buildBacklinks() {
    backLinksContainer.textContent = '';
    backlinks.forEach((backlink) => {
        const {name,url} = backlink;
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times','custom-circle');
        closeIcon.setAttribute('onclick', `deleteBacklink('${url}')`);

        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;

        linkInfo.appendChild(link);
        item.append(closeIcon,linkInfo);
        backLinksContainer.appendChild(item);
    });
};

function fetchBacklinks() {
    if(localStorage.getItem('backlinks'))
    {
        backlinks = JSON.parse(localStorage.getItem('backlinks'));
    }
    buildBacklinks();
};

function storeBackLink(e) {
    e.preventDefault();
    const nameValue = websiteName.value;
    let urlValue = websiteUrl.value;

    if (!urlValue.includes('https://' && !urlValue.includes('http://'))) 
    {
    urlValue = `https://${urlValue}`;
    }

    if (!validate(nameValue, urlValue)) 
    {
    return false;
    }

const backlink = 
{
    name: nameValue,
    url: urlValue,
};
    backlinks.push(backlink);
    localStorage.setItem('backlinks',JSON.stringify(backlinks));
    modal.classList.remove('show-modal');
    fetchBacklinks();
    backLinkForm.reset();
    websiteName.focus();
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {modal.classList.remove('show-modal');});
backLinkForm.addEventListener('submit', storeBackLink);
fetchBacklinks();