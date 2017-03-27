import { SCMResource, SCMResourceDecorations, Uri } from 'vscode';
import { DecorationProvider } from './DecorationProvider';
import { GetStatuses, Status } from './Status';


/**
 * An SCM resource represents a state of an underlying workspace resource
 * within a certain SCM provider state.
 *
 * For example, consider file A to be modified. An SCM resource which would
 * represent such state could have the following properties:
 *
 *   - `uri = 'git:workingtree/A'`
 *   - `sourceUri = 'file:A'`
 */
export class Resource implements SCMResource {
    private _statuses: Status[];

    get uri(): Uri { return this._uri; }
    get sourceUri(): Uri { return this._uri; }
    get decorations(): SCMResourceDecorations {
        // TODO Implement
        return DecorationProvider.getDecorations(this._statuses);
    }

    get status(): Status {
        if (this._statuses.length > 0) {
            return this._statuses[0];
        }
        return Status.UNKNOWN;
    }

    constructor(private _uri: Uri, private _change: string, action: string) {
        this._statuses = GetStatuses(action);
    }
}