import React, {Component} from 'react';

class FamilyModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            dataExist: false,
            familyData: []
        }
    }

    componentDidMount() {
        console.log("did mount");
        fetch('/families/' + this.props.id).then(
            response => response.json() 
        ).then (data => {
            if (data.length === 0) {
                this.setState({loaded: true, dataExist: false});
            } else {
                this.setState({loaded: true, dataExist: true, familyData: data});
            }
        });
    }

    render() {
        console.log(this.props);
        return (
            <>
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Modal Title
                        </h3>
                        <button
                            className="p-1 ml-auto bg-red text-white border-solid border-1 rounded border-black float-right text-3xl leading-none font-semibold m-1 focus:outline-none"
                            onClick={() => this.props.handleCloseModal()}
                        >
                            <span className="bg-red-500 text-white w-10 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {
                                this.state.loaded === false ? (
                                    <>
                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            loading...
                                        </p>
                                    </>
                                ) : 
                                <>
                                    {
                                        this.state.dataExist === false ? (
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                Family data does not exist...
                                            </p>
                                        ) :
                                        (
                                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                Family data content... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis, urna eget lacinia egestas, ligula risus ultrices libero, et convallis velit est at erat. Suspendisse volutpat eget diam et suscipit. Proin leo orci, viverra quis leo sit amet, dignissim faucibus eros. Nunc vestibulum quam mi, non consectetur nulla euismod eu. Aenean at fringilla leo. Donec vehicula finibus arcu, a tincidunt ligula. Vivamus imperdiet lectus vel semper elementum. Sed ultrices tristique congue. Cras non aliquet eros. Curabitur rhoncus bibendum erat, ac maximus erat congue at. Mauris feugiat erat ac ex aliquet mollis. Vestibulum malesuada viverra lacus, non lacinia arcu consectetur sed. Nulla facilisi. Donec gravida, purus eu rutrum vehicula, ligula urna rhoncus turpis, a congue diam nibh id ex. Nulla tristique dolor sit amet purus interdum pharetra
                                            </p>
                                            
                                        )
                                    }
                                </>
                            }
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => this.props.handleCloseModal()}
                        >
                            Close
                        </button>
                        <button
                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => this.props.handleCloseModal()}
                        >
                            Save Changes
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            </>
        )
    }
}

export default FamilyModal;