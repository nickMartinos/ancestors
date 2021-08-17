import React, {Component} from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import './Tree.css';

class Tree extends Component {

    constructor () {
        super();

        this.state = {
            treeData: {"nodes":[],"links":[]}
        }
    }
    
    componentDidMount() {
        this.getTreeData()
          .then(res => {
                this.setState({ treeData: res });
                console.log(res);
            })
          .catch(err => console.log(err));
    }

    getTreeData = async () => {
        const response = await fetch('/tree_data');
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      };
    

    render() {
        return (
            <div className="container mx-auto px-4">
                <p className="font-sans text-4xl">Tree!</p>

                <br/>

                <ForceGraph2D 
                    className='canvas-border'
                    graphData={this.state.treeData}
                    nodeAutoColorBy="group"
                    width={500}
                    height={500}
                    enableNodeDrag={false}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12/globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
        
                    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = node.color;
                    ctx.fillText(label, node.x, node.y);
        
                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                    }}
                    nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                    }}
                />
            </div>
        )
    }
}

export default Tree;

