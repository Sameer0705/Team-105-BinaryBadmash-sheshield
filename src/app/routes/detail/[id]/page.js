"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNftInfo, connectWallet, ownerOfNft, getName, getCid } from "../../../utils/ethers"; // Adjust the import path as needed

export default function NftDetailPage() {
    const { id } = useParams(); // Get the NFT ID from the URL
    const router = useRouter();
    const [nft, setNft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [description, setDescription] = useState("");    

    useEffect(() => {
        if (!id) return; // Prevent calling if no ID

        const fetchDetails = async () => {
            try {
                await connectWallet(); // Ensure wallet is connected
                console.log("Fetching NFT details for ID:", id);

                // Fetch NFT info using your existing `getNftInfo` function
                let tokenURI = await getNftInfo(id);
                console.log("Token URI:", tokenURI); // Log the tokenURI

                // Convert IPFS URI to HTTP URL if necessary
                if (tokenURI.startsWith("ipfs://")) {
                    tokenURI = `https://ipfs.io/ipfs/${tokenURI.replace("ipfs://", "")}`;
                }
                console.log("Token URI (processed):", tokenURI);

                // Fetch metadata from the tokenURI
                const metadataResponse = await fetch(tokenURI);
                if (!metadataResponse.ok) {
                    throw new Error(`Failed to fetch metadata: ${metadataResponse.statusText}`);
                }

                const metadataText = await metadataResponse.text(); // Log the raw response
                console.log("Metadata (raw):", metadataText);

                // Check if the response is valid JSON
                let metadata = {};
                try {
                    metadata = JSON.parse(metadataText); // Parse the JSON
                } catch (parseError) {
                    console.warn("Invalid JSON in metadata response, using fallback");
                    metadata = {
                        name: "Unnamed NFT",
                        category: "No category",
                    };
                }
                console.log("Metadata (parsed):", metadata);

                // Set the NFT state with metadata
                setNft({
                    tokenId: id,
                    ownerAddress: await ownerOfNft(id), // Fetch owner address
                    tokenName: await getName(id) || "Unnamed NFT",
                    cid: await getCid(id), // The tokenURI (CID or URL)
                });
            } catch (err) {
                console.error("Error fetching NFT details:", err);
                setError("Failed to fetch NFT details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);


    const SendEmail = async () => {
            const recipient = "support@sheshield.com"; // Replace with your desired email
            const subject = `Urgent Safety Concern Reported – Harassment in Public Transport`;
            const body = `
                Dear SheShield Support Team,

I am writing to report a safety concern through the SheShield app. Below are the details of the incident:

Type of Incident: Harassment

Description of the Incident:
${description}

Evidence (if any):
I have attached a photo taken discreetly during the incident.

Blockchain Verification:
NFT ID: ${nft.tokenId.toString()}
NFT Name: ${nft.tokenName}
Owner Address: ${nft.ownerAddress}
Metadata CID: ${nft.cid}

Action Requested:
I would like guidance on how to report this to the authorities and if SheShield can help in tracking such offenders.

I request prompt action on this matter and guidance on the next steps. Please let me know if further details are required.

Thank you for your support.
            `;

            window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;



        router.push("/routes/ai");
        }


    const upadatedes = (e) => {
        setDescription(e.target.value);
    }


    if (loading) return <p className="text-center text-gray-500">Loading NFT details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white h-screen text-black">
            <h1 className="text-2xl font-bold">NFT Details</h1>
            {nft ? (
                <div className="mt-4 border p-4 rounded-lg shadow">
                    <p><strong>ID:</strong> {nft.tokenId.toString()}</p>
                    <p><strong>Name:</strong> {nft.tokenName}</p>
                    <p><strong>Owner:</strong> {nft.ownerAddress}</p>
                    <p><strong>Metadata CID:</strong> {nft.cid}</p>
                </div>
            ) : (
                <p>No NFT details found.</p>
            )}

            <div className="mt-6 flex justify-center items-center">
                {nft && (
                    <div className="mt-6">
                        <button
                            onClick={SendEmail}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                            Send Reports via Email
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col mt-10  justify-center items-center">
                <h2 className="text-xl font-bold">Description</h2>
                <textarea onChange={upadatedes} className="w-[75%] h-48 mt-6 border" name="" id="" required>

                </textarea>
            </div>
        </div>
    );
}