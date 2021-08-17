import React, {Component, Fragment} from 'react';
import parse from 'html-react-parser'
import FamilyModal from './FamilyModal';

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageLoaded: false,
            userSearchName: '',
            users: [],
            families: [],
            showModal: false,
            modalId: -1
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        this.setState({
            showModal: false
        });
    }
    componentDidMount() {
        fetch('/families')
            .then(response => response.json())
            .then(data => {
                this.setState({pageLoaded: true, families: data});
        });
    }

    updateUserData(userSearchName) {
        if (userSearchName === '') {
            this.setState({users: []});
        }
        else {
            fetch('/people/' + userSearchName)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    this.setState({pageLoaded: true, users: data});
            });
        }
        this.setState({userSearchName});
    }

    showFamilyModal(familyId) {
        this.setState({
            showModal: true,
            modalId: familyId
        });
    }
    render() {
        return (
            <div>
                {this.state.pageLoaded === true ? (
                    <div className="container mx-auto">
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-5 pt-5">

                            {/* First window */}

                            <div className="col-span-1 md:col-span-2 rounded mr-5 ml-5 shadow-lg custom-container">
                                <div className="mt-5 ml-3 mr-3">
                                    <h1 className="font-light text-3xl mb-2">User Lookup</h1>
                                    <hr/>
                                    <p className="font-light">Please enter the name of the person you are looking for:</p>
                                    <input type="text" className="w-full px-4 py-3 rounded h-8 mt-3" onChange={event => {
                                        this.updateUserData(event.target.value);
                                    }}/>
                                </div>

                                <div className="ml-3 mt-5">
                                    {
                                        this.state.users.length === 0 ? (
                                            <>
                                                <p>No user requested.</p>
                                            </>
                                        ) : (
                                            <>
                                                {
                                                    this.state.users.map(val => <p key={val.id}>{parse(val.name.replaceAll(this.state.userSearchName, '<b>'+ this.state.userSearchName +'</b>'))}</p>)
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Second window */}

                            <div className="col-span-1 mr-5 ml-5 md:ml-0 rounded shadow-lg custom-container">
                                <div className="mt-5 ml-3 mr-3">
                                    <h1 className="font-light text-3xl mb-2">Families</h1>
                                    <hr/>
                                    {
                                        this.state.families.length === 0 ? (
                                            <>
                                                <p>No families in the system.</p>
                                            </>
                                        ) : (
                                            <>
                                                {
                                                    this.state.families.map(val => 
                                                        <div key={val.id}>
                                                            {/* <p key={val.id}>{val.family}</p> */}
                                                            <div className="flex flex-wrap py-2 mt-2">
                                                                <div className="w-full px-4">
                                                                    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-red-500 rounded">
                                                                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                                                                        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                                                                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                                                                            {val.family}
                                                                        </a>
                                                                        <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                                                                            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                                                                            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                                                                            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                                                                        </button>
                                                                        </div>
                                                                        <div className="flex lg:flex-grow items-center" id="example-navbar-info">
                                                                        <ul className="flex flex-col lg:flex-row list-none ml-auto">
                                                                            <li className="nav-item">
                                                                            <button className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" onClick={() => this.showFamilyModal(val.id)}>
                                                                                Discover
                                                                            </button>
                                                                            </li>
                                                                        </ul>
                                                                        </div>
                                                                    </div>
                                                                    </nav>
                                                                </div>
                                                                </div>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto">
                        <div className="custom-container shadow-lg">
                            <h1>Loading...</h1>
                        </div>
                    </div>
                )}
                
                {
                    this.state.showModal ? (
                        <FamilyModal id={this.state.modalId} handleCloseModal={this.handleCloseModal}/>
                    ) : (null)
                }
            </div>
        )
    }
}

export default Admin;