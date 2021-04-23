import { context, storage, logging, PersistentMap, PersistentDeque, PersistentVector, PersistentSet } from "near-sdk-as";
import {Token} from './model';
// --- contract base on Non-Fungible Token (NEP-171)


/**************************/
/* STORAGE AND COLLECTIONS */
/**************************/
 
const tokensArchive = new PersistentMap<u64, Token[]>("tokensArchive:");
const tokensMap = new PersistentMap<u64, Token>("tokensMap:");
const tokenCounter = new PersistentMap<string, u64>("tc:");
const currentTokenOwner = new PersistentMap<u64, string>("ato:");
 
/******************/
/* CHANGE METHODS */
/******************/
 


 
export function init(initialOwner: string): void {
  logging.log("initialOwner: " + initialOwner);
  assert(storage.get<string>("init") == null, "Already initialized token supply");
 
  storage.set("init", "done");
  storage.set("lastIdToken", 0)
}

/**************************/
/* PUBLIC METHODS */
/**************************/
 

export function createCollectible(metadata: any): i32 {
  let newItemId = storage.getPrimitive<i32>("lastIdToken", 0)
  // if(newItemId === null) newItemId = 0
  newItemId = newItemId + 1;
  const token: Token = {
    id: newItemId,
    owner_id: context.sender,
    metadata
  }
  tokensMap.set(newItemId, token)
  const lastOwners = tokensArchive.get(newItemId -1) ? tokensArchive.get(newItemId -1) : [] as Token[]
  if(lastOwners) {
    lastOwners.push(token)
  tokensArchive.set(newItemId, lastOwners)
  currentTokenOwner.set(newItemId, context.sender)
  tokenCounter.set('lastIdToken', newItemId)
  } 
  return newItemId;
}
 
export function nftTransfer(
  owner_id: string,
  receiver_id: string,
  tokenId: number,
  approved_account_ids: null|string[],
): bool {
  const transferedToken = nftToken(tokenId)
  if(transferedToken) {
    assertOwner(transferedToken)

    return true;
  } else {
    return false;
  }
  
  
} 

/****************/
/* VIEW METHODS */
/****************/
export function nftToken(token_id: number): Token|null {
  return tokensMap.getSome(token_id);
}

export function getListOwners(token_id: number): Token[]|null {
  return tokensArchive.getSome(token_id);
}

/****************/
/* PRIVATE METHODS */
/****************/

 function assertOwner(token: Token): void {
  const caller = context.sender
  assert(token.owner_id == caller, "Only the owner of this token may call this method")
}

function changeTokenOwner(tokenId: number, newOwner: string): void {
  const token = tokensMap.getSome(tokenId);
  token.owner_id = newOwner
  const lastOwners = tokensArchive.get(tokenId) ? tokensArchive.get(tokenId) : [] as Token[]
  if(lastOwners) {
    lastOwners.push(token)
  tokensArchive.set(tokenId, lastOwners)
  currentTokenOwner.set(tokenId, context.sender)
  tokenCounter.set('lastIdToken', tokenId)
  }
  
} 