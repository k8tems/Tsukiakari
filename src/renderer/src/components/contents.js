import React, { Component } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { isEmpty } from 'lodash';
import TimelineBox from './timeline-box';
import log from '../lib/log';
import B from '../lib/bem';

const b = B.with('contents');

export default class Contents extends Component {
  static defaultProps = {
    columns: [],
  };

  renderPane() {
    return (
      <SortablePane
        margin={20}
        className="contents__sortable-pane"
        order={[]}
        zIndex={1}
      >
        {this.renderPanes()}
      </SortablePane>
    );
  }

  renderPanes() {
    return this.props.columns.map(column => (
      <Pane
        id={column.id}
        key={column.id}
        width={320}
        minWidth={320}
        height={400}
        className="contents__pane"
      >
        <TimelineBox
          ref={column.id}
          column={column}
          timeline={this.props.timeline}
          accounts={this.props.accounts}
          deleteRequest={this.props.deleteRequest}
        />
      </Pane>
    ));
  }

  renderMessage() {
    return (
      <div
        className={b('message', { 'no-contents': true })}
        onClick={this.props.openAddColumnMenu}
      >
        Please add new column.
      </div>
    );
  }

  render() {
    log.debug('render contents');
    return (
      <div className={b()}>
          {
            isEmpty(this.props.columns)
              ? this.renderMessage()
              : this.renderPane()
          }
      </div>
    );
  }
}
