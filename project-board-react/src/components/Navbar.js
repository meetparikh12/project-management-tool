import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div class="container">
                    <Link class="navbar-brand" to="/">
                    Project Task Tool
                    </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span class="navbar-toggler-icon" />
                    </button>
                </div>
            </nav>
        </div>
    )
}
