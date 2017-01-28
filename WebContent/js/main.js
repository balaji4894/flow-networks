(function () {
  'use strict'
  var findNodePostions = function(nodes, links){
    var i, j, n=links.length, m=nodes.length;
    var indexedNodesByid={};
		var indexNodesByid = function(){
      nodes.forEach(function(node){
  			indexedNodesByid[node.id] = node;
  		});
    };
    indexNodesByid();
		// Identify all inward and outward links of a node
		var indentifyFlowInNodes = function(){
      for(i=0;i<n;i++){
  			var source=null,target=null;
  			for(j=0;j<m;j++){
  				if(!source){
  					source = (nodes[j] === indexedNodesByid[links[i].source.id])?nodes[j]:null;
  				}
  				if(!target){
  					target = (nodes[j]=== indexedNodesByid[links[i].target.id])?nodes[j]:null;
  				}
  				if(source && target){
  					if(!source.outwardLinks){
  						source.outwardLinks = [];
  					}

  					if(!target.inwardLinks){
  						target.inwardLinks = [];
  					}
  					source.outwardLinks.push(links[i]);
  					target.inwardLinks.push(links[i]);
  					break;
  				}
  			}
  		}
    };

    indentifyFlowInNodes();
    
		//	Identify all nodes x positions
    // Internally this implements the DepthFirstSearch Approach
		var updateLXPositions = function(nodes,lx){
			if(nodes.length == 0){
				return ;
			}
			var remainingNodes = [];
			nodes.forEach(function(node){
				if(!node.outwardLinks){
					node.lx = lx;
				}
				else {
					node.lx = lx;
					node.outwardLinks.forEach(function(link){
						remainingNodes.push(indexedNodesByid[link.target.id]);
					});
				}
			});
			updateLXPositions(remainingNodes,lx+1);
		}
		updateLXPositions(nodes,0);
  };

  var flowNetworks = {
    getNodePostions : findNodePostions
  };
})();
