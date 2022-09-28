import { Component } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <div className="navbar sticky top-0">
                <div className="flex-1">
                    <div className="btn btn-ghost normal-case text-xl">
                        @matterai
                    </div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to="/works">Works</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        <li><a href="https://github.com/matterai"><GitHubIcon /> GitHub</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}