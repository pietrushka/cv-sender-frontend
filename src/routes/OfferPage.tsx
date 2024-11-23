import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Offer } from "../hooks/useGetOffers";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Avatar from "@mui/joy/Avatar";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";

async function fetchOffer(offerId: string) {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/offer/" + offerId,
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_AUTH_KEY,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function OfferPage() {
  const [offer, setOffer] = useState<Offer>();
  const { offerId } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (!offerId) {
        return;
      }

      const response = await fetchOffer(offerId);
      setOffer(response);
    }
    fetchData();
  }, [offerId]);

  if (!offer) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography level="h4">Job offer not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, px: 2 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={offer.image}
              alt={offer.title}
              sx={{ width: 80, height: 80, mr: 2 }}
            />
            <Box>
              <Typography level="h2">{offer.title}</Typography>
              <Typography level="body-md" color="neutral">
                {offer.workLocation} {offer.isRemote && "(Remote)"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography level="h4" sx={{ mb: 1 }}>
            Description
          </Typography>
          <Typography level="body-md">{offer.description}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography level="h4" sx={{ mb: 1 }}>
            Technologies
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {offer.technologies.map((tech) => (
              <Chip
                key={tech}
                variant="soft"
                color="primary"
                sx={{ textTransform: "capitalize" }}
              >
                {tech}
              </Chip>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
