import { Component } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';

export default class Header extends Component {
    render() {
        return (
            <div className="navbar sticky top-0">
                <div className="flex-1">
                    <div className="btn btn-ghost normal-case text-xl">@matterai</div>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0">
                        <li><a href="/">Works</a></li>
                        <li><a href="/">Posts</a></li>
                        <li>
                            <a href="/"><GitHubIcon /> GitHub</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}