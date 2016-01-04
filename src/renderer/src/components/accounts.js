import React, { Component } from 'react';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {accounts} = this.props;
    console.dir(accounts);
    return (
      <div className="accounts">
        <div className="accounts__accounts">
          {
            do {
              accounts.map(account => {
                return (
                  <img
                     key={account.id}
                     src={account.profile_image_url}
                     className="accounts__avatar"/>
                );
              });
            }
          }
        </div>
        <div className="accounts__add">
          <i className="accounts__icon--add lnr lnr-plus-circle"/>
          Add
        </div>
      </div>
    );
  }
}
