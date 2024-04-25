import { Address } from "viem";
import {
	RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers,
} from 'obscenity';

// const { TextCensor  } = require('obscenity');

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

export function safeBigInt(value : BigInt | undefined) : string {
	return value ? value.toString() : "0";

}



export function pretty(address :Address){
    return `${address.toString().substring(0, 6)}...${address.toString().substring(38, 42)}`;
}

export function censor(input: string){
    const censor = new TextCensor();
    const matches = matcher.getAllMatches(input);
    return censor.applyTo(input, matches);
}