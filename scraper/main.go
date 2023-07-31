package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/go-resty/resty/v2"
)

type PlacesResponse struct {
	Results []Place `json:"results"`
}

type Place struct {
	Name     string `json:"name"`
	Geometry `json:"geometry"`
}

type Geometry struct {
	Location `json:"location"`
}

type Location struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

// func HandleCSPViolationRequest(w http.ResponseWriter, req *http.Request) {
// 	body := App.MustReadBody(req, w)
// 	if body == nil {
// 		return
// 	}

// 	var prettyJSON bytes.Buffer
// 	error := json.Indent(&prettyJSON, body, "", "\t")
// 	if error != nil {
// 		log.Println("JSON parse error: ", error)
// 		App.BadRequest(w)
// 		return
// 	}

// 	log.Println("CSP Violation:", string(prettyJSON.Bytes()))
// }

func getDogParksInToronto(apiKey string) ([]Place, error) {
	url := "https://maps.googleapis.com/maps/api/place/textsearch/json"
	params := map[string]string{
		"query": "off leash dog parks",
		"key":   apiKey,
	}

	client := resty.New()
	response, err := client.R().SetQueryParams(params).Get(url)

	if err != nil {
		return nil, err
	}

	var placesResponse PlacesResponse
	err = json.Unmarshal(response.Body(), &placesResponse)
	if err != nil {
		return nil, err
	}

	return placesResponse.Results, nil
}

func main() {
	apiKey := os.Getenv("GOOGLE_API_KEY")

	fmt.Println("apiKey", apiKey)
	dogParks, err := getDogParksInToronto(apiKey)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Print the names and locations of the dog parks
	for _, park := range dogParks {
		fmt.Printf("Name: %s\nLat: %f, Lng: %f\n\n", park.Name, park.Lat, park.Geometry)
	}
}
