// The 'backend' program.
program backend.aleo {
    mapping proposals: field => address;

    record Proposal {
        owner: address,
        public votes_to_distribute: u8,
        id: field,
        // last block when it could be voted; if you want unbounded proposal --- just set a high enough number
        deadline: u32,
        // TODO research if imported types can be used for voting on
        count_y: u8,
        count_n: u8
    }

    record Voter {
        owner: address,
        proposal_id: field
    }
    
    transition new(
        public voters_count: u8,
        public id: field,
        public deadline: u32
    ) -> public Proposal {
        return Proposal{
            owner: self.caller, votes_to_distribute: voters_count, id, deadline, count_y: 0u8, count_n: 0u8
        } then finalize(id, self.caller, deadline);
    } finalize new(public proposal_id: field, public initiator: address, public deadline: u32) {
        assert(deadline > block.height);
        assert(!Mapping::contains(proposals, proposal_id));
        Mapping::set(proposals, proposal_id, initiator);
    }

    transition voter_add(
        voter: address, public proposal: Proposal
    ) -> (public Proposal, Voter) {
        assert(proposal.owner == self.caller); //, "Only proposal owner can add voters");
        assert(proposal.votes_to_distribute > 0u8); //, "No more votes to distribute");
        return (
            Proposal{
                owner: proposal.owner, 
                votes_to_distribute: proposal.votes_to_distribute - 1u8, 
                id: proposal.id,
                deadline: proposal.deadline,
                count_y: proposal.count_y,
                count_n: proposal.count_n,
            },
            Voter{owner: voter, proposal_id: proposal.id}
        );
    }

    transition vote_transition(vote_record: Voter, proposal: Proposal, choice_flag: u8) -> public Proposal {
        assert(choice_flag <= 1u8); // `bool` tends to be more expensive in circuits
        assert(vote_record.proposal_id == proposal.id);// , "This `Voter` record is for another proposal");
        return Proposal{
            owner: proposal.owner, 
            votes_to_distribute: proposal.votes_to_distribute, 
            id: proposal.id, 
            deadline: proposal.deadline,
            count_y: proposal.count_y + choice_flag, 
            count_n: proposal.count_n + (1u8 - choice_flag)
        } then finalize(proposal.deadline);
    } finalize vote_transition(deadline: u32) {
        assert(block.height >= deadline);
    }
}