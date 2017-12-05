import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    // Defining propTypes for the types of input the application will be receiving.
    static propTypes = {
        // Ensure that contacts is an array and is required for the application
        contacts: PropTypes.array.isRequired,
        // Ensure that onDeleteContact is a function and is required for the application
        onDeleteContact: PropTypes.func.isRequired
    };

    // Define state of the component, specifically as it relates to the query string for the search box.
    state = {
      query: ''
    };

    // This function updates the query string by setting the state of the query attribute as it is entered in the input field
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    };

    // This function clears query or sets the state to an empty string when the show all link/button is clicked
    clearQuery = () => {
        this.setState({ query: '' })
    };

    // Render function as needed by all react components
    render() {
        // Define specific variables and where they are held.  In this case both of these variables are held in this.prop and this allows you to call contacts instead of this.props.contacts.  makes the code cleaner
        const { contacts, onDeleteContact } = this.props;
        // This defines the variable of query which is housed in this.state.
        const { query } = this.state;

        // this creates a variable that returns a different variable based on the use of regexp used in the input field.
        let showingContacts;
        if(query) {
            // if one of the array values matches the regexp that is entered then filter and return the ones that match
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name) )
        } else {
            // if no regexp exists return the array as it has been provided.
            showingContacts = contacts
        }

        // before using the showingContacts variable sort them by name so that they always appear in aphabetical order even when they are being sorted.
        showingContacts.sort(sortBy('name'));

        // Return value of what is being sent back to the DOM for rendering
        return (
            // This is the wrapper for the entire app component.  Only one element can be returned so if there are nested HTML elements make sure there is a parent element that is the primary return element
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search contacts..."
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to='/create'
                        className="add-contact"
                    >Add Contact</Link>
                </div>

                { showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing { showingContacts.length } of { contacts.length } </span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}

                <ol className="contact-list">
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts