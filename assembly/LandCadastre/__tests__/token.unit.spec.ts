import { VMContext, u128, VM, storage, context } from "near-sdk-as";
import { LandCadastre, Token } from "./../assembly/model";
import {
  init,
  createCollectible,
  nftToken
} from "../assembly";

let alice = "alice";
let bob = "bob.near";
let eve = "eve.near";

describe("04. Token", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(alice);
    VMContext.setAccount_balance(u128.fromString("1000000"));
    init(alice);
  });

 

  it("can create nft successfully", () => {
    const tokenUri = 'HASH_File'
     const token: Token = {
      id: 0,
      owner_id: context.sender,
      metadata: tokenUri
     }
    const idToken = createCollectible(tokenUri)
    expect(1).toBe(idToken);
    const expectedTokenId = nftToken(0)
    if(expectedTokenId) {
      expect(token).toBe(expectedTokenId);
    }
    
    // expect(VM.logs()).toContainEqual(
    //   `created token:"${0} "with uri:${tokenUri}`
    // )
  }
  )

  it("can get nft by id", () => {
    const tokenUri = 'Abcd'
    const idToken = createCollectible(tokenUri)
    expect(idToken).toBe(1);
    const expectedTokenId = getTokenURIById(idToken)
    expect(tokenUri).toBe(expectedTokenId);
    // expect(VM.logs()).toContainEqual(
    //   `created token:"${0} "with uri:${tokenUri}`
    // )
  }
  )



  describe(" LandCadastre", () => {
    it("should allow instantiation", () => {
      const message = new LandCadastre(
        "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
        "HASH_FILE"
        // {
        //   location: {
        //     lat: 37.4211274197085, lng: 37.4870987, location_type: "ROOFTOP", viewport: {
        //       northeast: {
        //         lat: -122.0855988802915, lng: 37.4211274197085
        //       },
        //       southwest: {
        //         lat: 37.4238253802915,
        //         lng: -122.0842499
        //       }
        //     }
        //   }
        // }
        );
      expect(message instanceof LandCadastre).toBeTruthy();
    });
  });
});
