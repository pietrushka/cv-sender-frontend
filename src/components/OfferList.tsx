import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import { FaLocationDot } from "react-icons/fa6";
import { Offer, useGetOffers } from "../hooks/useGetOffers";
import { Link } from "react-router-dom";

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link
      to={`/offer/${offer._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography level="h4">{offer.title}</Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FaLocationDot size={18} />
              <Typography>Zdalnie</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {offer.technologies.map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    backgroundColor: "background.level2",
                    px: 1,
                    py: 0.5,
                    borderRadius: "sm",
                    fontSize: "sm",
                    color: "text.secondary",
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export function OfferList() {
  const { offers, pagination } = useGetOffers();
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Oferty:</h2>
        <h3>Total offers: {pagination?.totalItems || 0}</h3>
      </div>
      {!offers ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ mt: 2 }}>
          {offers.length > 0 ? (
            offers.map((offer) => <OfferCard offer={offer} key={offer._id} />)
          ) : (
            <Typography>No offers match your criteria.</Typography>
          )}
        </Box>
      )}
    </>
  );
}
