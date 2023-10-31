import UpvoteButton from "./UpvoteIcon";
import DownvoteButton from "./DownvoteIcon";
import "../assets/css/output.css";

interface Props {
  voteCount: number;
  addVote: any;
  removeVote: any;
}

function Voting (props: Props): JSX.Element {

    return (
        <div className="h-fit w-fit flex flex-col px-10">
            <button className="btn w-1/3 rounded-full" onClick={() => props.addVote(true)}>
                {<UpvoteButton/>}
            </button>
            <b className="text-center text-sm">
                {props.voteCount}
            </b>
            <button className="btn w-1/3 rounded-full" onClick={() => props.removeVote(false)}>
                {<DownvoteButton />}
            </button>
        </div>
    );
}

export default Voting;
