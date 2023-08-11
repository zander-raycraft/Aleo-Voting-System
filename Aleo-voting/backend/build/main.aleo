program backend.aleo;

record Proposal:
    owner as address.private;
    votes_to_distribute as u8.public;
    id as field.private;
    count_y as u8.private;
    count_n as u8.private;

record Voter:
    owner as address.private;
    proposal_id as field.private;


mapping proposals:
	key left as field.public;
	value right as address.public;

function new:
    input r0 as u8.public;
    input r1 as field.public;
    cast self.caller r0 r1 0u8 0u8 into r2 as Proposal.record;
    output r2 as Proposal.record;

    finalize r1 self.caller;

finalize new:
    input r0 as field.public;
    input r1 as address.public;
    contains proposals[r0] into r2;
    not r2 into r3;
    assert.eq r3 true;
    set r1 into proposals[r0];


function voter_add:
    input r0 as address.private;
    input r1 as Proposal.record;
    is.eq r1.owner self.caller into r2;
    assert.eq r2 true;
    gt r1.votes_to_distribute 0u8 into r3;
    assert.eq r3 true;
    sub r1.votes_to_distribute 1u8 into r4;
    cast r1.owner r4 r1.id r1.count_y r1.count_n into r5 as Proposal.record;
    cast r0 r1.id into r6 as Voter.record;
    output r5 as Proposal.record;
    output r6 as Voter.record;


function vote_transition:
    input r0 as Voter.record;
    input r1 as Proposal.record;
    input r2 as u8.private;
    lte r2 1u8 into r3;
    assert.eq r3 true;
    is.eq r0.proposal_id r1.id into r4;
    assert.eq r4 true;
    add r1.count_y r2 into r5;
    sub 1u8 r2 into r6;
    add r1.count_n r6 into r7;
    cast r1.owner r1.votes_to_distribute r1.id r5 r7 into r8 as Proposal.record;
    output r8 as Proposal.record;
