var myObj = {
	"Asset Management": {
		"get_asset_dictionary": ["sessionID", "encodings", "vodPriceSetLevels", "serverDirectories", "categoryLeaves", "suppliers", "starRatings", "movieRatingCodes", "tvRatingCodes", "videoServerPartitions", "trailers", "posters", "md_sam.get_asset_dictionary"]
	},
	"Service Package": {
		"create_service_package": ["sessionID", "name", "description", "price", "startDate", "channelPackageIDs", "miscServiceIDs", "svodIDs", "widgetPackageIDs", "ottChannelPackageIDs", "md_cdk.create_service_package"],

		"delete_service_package": ["sessionID", "servicePackageID", "md_srv.del_service_pkg"],
		"edit_service_package": ["sessionID", "servicePackageID", "name", "description", "price", "startDate", "channelPackageIDs", "miscServiceIDs", "svodIDs", "widgetPackageIDs", "ottChannelPackageIDs", "md_cdk.edit_service_package"],
		"get_service_package_info": ["sessionID", "servicePackageID", "servicePackageInfo", "channelPackages", "miscServices", "SVODs", "widgetPackageIDs", "ottChannelPackageIDs", "md_srv.get_service_package_info"],
		"get_services": ["sessionID", "lineupID", "servicePackages", "channelPackages", "alaCartePackages", "svodPackages", "miscServices", "widgetPackages", "ottChannelPackages", "md_srv.get_services"],
		"add_other_service": ["sessionID", "name", "description", "parameter", "price", "startDate", "md_srv.add_other_service"]
	},
	"Asset Playback Resources": {
		"add_asset_playback_resource": ["sessionID", "assetID", "protocol", "mimeType", "URL", "channelProfileID", "encryption", "encryptionID", "serverType", "md_sam.add_asset_playback_resource"]
	}
};


