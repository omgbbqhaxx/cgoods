//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
 

contract  YourContract {
    address creator;
    event NewCandidate(address indexed from, uint256 value);
    event CandidateDelisted(uint256 indexed productId);
    
    struct Candidates {
        address _lister;
        string _title;
        string _explanation;
        string _ghub;
        string _ytube;
        uint256 _vote;
        bool _isdelisted;
    }

    mapping(uint256 => Candidates) public clist;
    uint256[] private indexList;
    mapping (address => bool) isvoter;

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can perform this action");
        _;
    }

    modifier validCid(uint256 productid) {
        require(productid < indexList.length, "Invalid product ID");
        _;
    }

    constructor() {
        creator = msg.sender;
    }

    function registerCandidate(string memory _title, string memory _ghub, string memory _ytube, string memory _explanation) public {
        require(bytes(_title).length > 0, "Title  is required");
        require(bytes(_explanation).length > 0, "Explanation is required");

        Candidates memory newCandidate = Candidates({
            _lister: msg.sender,
            _title: _title,
            _explanation: _explanation,
            _ghub: _ghub,
            _ytube: _ytube,
            _vote: 0,
            _isdelisted: false
        });

        clist[indexList.length] = newCandidate;
        indexList.push(indexList.length);
        emit NewCandidate(msg.sender, indexList.length);
    }

    function plister() public view returns (Candidates[] memory) {
        Candidates[] memory allCandidates = new Candidates[](indexList.length);
        for (uint256 i = 0; i < indexList.length; i++) {
            allCandidates[i] = clist[i];
        }
        return allCandidates;
    }

    function ccount() public view returns (uint256) {
        return indexList.length;
    }

    function transferOwnership(address newOwner) public onlyCreator {
        require(newOwner != address(0), "New owner cannot be the zero address");
        creator = newOwner;
    }

    function delegatenewvoter(address voter) public onlyCreator {
        require(voter != address(0), "New owner cannot be the zero address");
        isvoter[voter] = true;
    }

    function delist(uint256 cid) public validCid(cid) onlyCreator {
        require(clist[cid]._lister == msg.sender || msg.sender == creator, "Only lister or creator can delist");
        clist[cid]._isdelisted = true;
        emit CandidateDelisted(cid);
    }

    function vote(uint256 cid, uint256 _vamount) public validCid(cid) {
        require(clist[cid]._lister != msg.sender || isvoter[msg.sender] == true, "Only jugde can judge candidates");
        clist[cid]._vote = _vamount;
    }
}
