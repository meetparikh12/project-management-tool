import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                        Personal Project Tool
                    </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span class="navbar-toggler-icon" />
                    </button>

                    <div class="collapse navbar-collapse" id="mobile-nav">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <Link class="nav-link" to="/">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>

                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link " href="register.html">
                                    Sign Up
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="login.html">
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
