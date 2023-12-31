// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct EIP712Signature {
    uint8 v;
    bytes32 r;
    bytes32 s;
    address signer;
}

struct UpdateRequest {
    bytes32 attestationId;
    uint64 expirationDate;
    bytes[] attestationData;
}

struct AttestationRequest {
    bytes32 schemaId; // The unique identifier of the schema used.
    bytes32 parentId; // The unique identifier of the parent attestation (see DAG).
    address attestor; // The Attestor smart contract address.
    address attestee; // The Attestee address (receiving attestation).
    uint64 expirationDate; // The expiration date of the attestation.
    bytes[] attestationData; // The attestation data.
}

struct Attestation {
    bytes32 attestationId; // The unique identifier of the attestation.
    bytes32 schemaId; // The unique identifier of the schema used.
    bytes32 parentId; // The unique identifier of the parent attestation (see DAG).
    address attester; // The address issuing the attestation to the attestee.
    address attestee; // The Attestee address (receiving attestation).
    address attestor; // The Attestor smart contract address.
    uint64 attestedDate; // The date the attestation is issued.
    uint64 updatedDate; // The date of the last update of the attestation.
    uint64 expirationDate; // The expiration date of the attestation.
    bool isPrivate; // Whether the attestation is private or public.
    bool revoked; // Whether the attestation is revoked or not.
    // 
    bytes[] attestationData; // The attestation data.
}

struct Schema {
    bytes32 schemaId; // The unique identifier of the schema.
    uint256 schemaNumber; // The schema number.
    address creator; // The address of the schema creator.
    address attestor; // The address of the Attestor smart contract.
    bool isPrivate; // Whether the schema is private or public.
    bool onChainAttestation; // Whether the schema requires on-chain attestation.
    bytes[] schema; // The schema string.
    string description;
}