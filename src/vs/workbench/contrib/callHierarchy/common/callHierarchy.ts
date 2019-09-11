/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IRange } from 'vs/editor/common/core/range';
import { SymbolKind, ProviderResult } from 'vs/editor/common/modes';
import { ITextModel } from 'vs/editor/common/model';
import { CancellationToken } from 'vs/base/common/cancellation';
import { LanguageFeatureRegistry } from 'vs/editor/common/modes/languageFeatureRegistry';
import { URI } from 'vs/base/common/uri';
import { IPosition } from 'vs/editor/common/core/position';

export const enum CallHierarchyDirection {
	CallsTo, CallsFrom
}

export interface CallHierarchyItem {
	_id: number;
	kind: SymbolKind;
	name: string;
	detail?: string;
	uri: URI;
	range: IRange;
	selectionRange: IRange;
}

export interface CallsTo {
	source: CallHierarchyItem,
	sourceRanges: IRange[]
}

export interface CallsFrom {
	sourceRanges: IRange[],
	target: CallHierarchyItem
}

export interface CallHierarchyProvider {

	resolveCallHierarchyItem(document: ITextModel, postion: IPosition, token: CancellationToken): ProviderResult<CallHierarchyItem>;

	provideCallsTo(target: CallHierarchyItem, token: CancellationToken): ProviderResult<CallsTo[]>;

	provideCallsFrom(source: CallHierarchyItem, token: CancellationToken): ProviderResult<CallsFrom[]>;
}

export const CallHierarchyProviderRegistry = new LanguageFeatureRegistry<CallHierarchyProvider>();

