import { useState, useEffect } from "react";
import './Members.css'
import '../../assets/theme.css'
// import { selectMouseDown, selectMouseUp, selectMouseMove, SelectBox } from "../display_box/SelectBox";
import '../../assets/colors.css'
import Select from '../selectOption/selectOption'

function Box({ name, color, members, allMembers }) {

	const [selectedItems, setSelectedItems] = useState([]);
	const [addMember, setAddMember] = useState(false);
	const [memberList, setMemberList] = useState(members);
	const [newMember, setNewMember] = useState(null);

	useEffect(() => {
		if (newMember == null)
			return;

		//api/role/add_member?user_id=:user_id&&session_id=:session_id
		setMemberList([...memberList, newMember]);
		setNewMember(null);
	}, [newMember, memberList])

	const handleItemClick = (id, ctrlKey, shiftKey) => {
		let newSelectedItems;
		if (ctrlKey) {
			if (selectedItems.includes(id)) {
				newSelectedItems = selectedItems.filter(itemId => itemId !== id);
			} else {
				newSelectedItems = [...selectedItems, id];
			}
		}
		else if (shiftKey) {
			const min = Math.min(...selectedItems);
			newSelectedItems = id <= Math.min(...selectedItems) ?
				Array(min - id + 1).fill().map((_, index) => index + id) :
				Array(id - min + 1).fill().map((_, index) => index + min)
		}
		else {
			newSelectedItems = [id];
		}

		setSelectedItems(newSelectedItems);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest('.box') || e.key == 'Escape') {
				setSelectedItems([]);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const handleClickOutsideAddMember = (e) => {
			if ((!e.target.closest('.add-member') && !e.target.closest('.select')) || e.key == 'Escape') {
				setAddMember(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutsideAddMember);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideAddMember);
		};
	}, []);


	return (
		<>
			<div className="col">
				<div className={`box-name c-${color}`} >{name}</div>

				<ul className={`box c-border-${color}`}>
					{memberList.map((member, index) => {
						return (
							<div className={`box-item ${selectedItems.includes(index) ? 'm-primary' : 'unselected'}`} onClick={(e) => handleItemClick(index, e.ctrlKey, e.shiftKey)}>
								{member}
							</div>
						)
					})}
				</ul>

				{
					addMember ? <Select list={allMembers} onSelectValue={setNewMember} /> :
						<p className="add-member" onClick={(e) => setAddMember(true)}>+Add</p>
				}
			</div>
		</>
	)
}

function Members() {


	//api/roles/index/vals?session=:session_id
	const roles = [
		{
			id: 1,
			name: 'Admin',
			color: 'green',
			members: ['name 1', 'name 2', 'name 3', 'name 4', 'name 5']
		},

		{
			id: 2,
			name: 'Custom role 1',
			color: 'cyan',
			members: ['name 1', 'name 2', 'name 3',]
		},

		{
			id: 3,
			name: 'Custome role 2',
			color: 'red',
			members: ['name 1', 'name 2']
		},
		{
			id: 4,
			name: 'Custome role 3',
			color: 'orange',
			members: ['name 1', 'name 2', 'name 3',]
		},
	];

	//data/api/members/index 
	const members = [
		'member 2',
		'member 3',
		'member 4',
		'member 5',
		'member 5',
		'member 5',
		'member 5',
		'member 5',
		'member 5',
	]
	return (
		<div className="participants">
			{/* <SelectBox box={selectBox}/> */}
			<div className="m-heading">Members</div>
			<div style={{ width: `${roles.length * 25}%` }}>
				<div className="container-fluid" >
					<div className="row">
						{
							roles.map((role) => (<Box name={role.name} color={role.color} members={role.members} allMembers={members} />))
						}
					</div>
				</div>

			</div>
		</div>
	)

}
export default Members; 