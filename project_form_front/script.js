// Sample member data
const members = [
    {
        id: 1,
        name: 'Ayan shaikh',
        tagline: 'darkness is peace',
        avatar: 'path/to/avatar1.jpg'
    },
    {
        id: 2,
        name: 'Amir shaikh',
        tagline: 'darkness is peace',
        avatar: 'path/to/avatar2.jpg'
    },
    {
        id: 3,
        name: 'Affan shaikh',
        tagline: 'darkness is peace',
        avatar: 'path/to/avatar3.jpg'
    }
];

const selectedMembersArray = [];

document.addEventListener('DOMContentLoaded', () => {
    const availableMembersList = document.getElementById('availableMembers');
    
    // Render initial members
    renderMembers(members, availableMembersList);

    // Handle form submission
    document.getElementById('projectForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log('Form submitted', Object.fromEntries(formData));
    });

    // Handle ADD button click
    document.querySelector('.add-btn').addEventListener('click', () => {
        const emailInput = document.getElementById('emailInput');
        if (emailInput.value && emailInput.value.includes('@')) {
            console.log('Adding new member:', emailInput.value);
            emailInput.value = '';
        }
    });
});

function renderMembers(membersList, container) {
    container.innerHTML = membersList.map(member => `
        <div class="member-card">
            <input type="checkbox" 
                   class="member-checkbox" 
                   name="selected_members" 
                   value="${member.id}"
                   ${selectedMembersArray.includes(member.id) ? 'checked' : ''}>
            <div class="member-info">
                <h4>${member.name}</h4>
                <p>${member.tagline}</p>
            </div>
        </div>
    `).join('');

    // Add checkbox event listeners
    container.querySelectorAll('.member-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const memberId = parseInt(e.target.value);
            if (e.target.checked) {
                if (!selectedMembersArray.includes(memberId)) {
                    selectedMembersArray.push(memberId);
                }
            } else {
                const index = selectedMembersArray.indexOf(memberId);
                if (index > -1) {
                    selectedMembersArray.splice(index, 1);
                }
            }
        });
    });
}
