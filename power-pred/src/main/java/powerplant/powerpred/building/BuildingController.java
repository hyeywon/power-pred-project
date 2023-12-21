package powerplant.powerpred.building;

import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import powerplant.powerpred.power.PowerService;
import powerplant.powerpred.request.UploadValue;
import powerplant.powerpred.response.AdminFile;
import powerplant.powerpred.response.BuildingInfo;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BuildingController {

    private final BuildingService buildingService;
    private final PowerService powerService;

    @PostMapping("/upload")
    public ResponseEntity<Long> upload(@RequestPart MultipartFile csv, @RequestPart UploadValue value) {
        log.info("UPLOAD: " + value.toString());
        Long buildingID = buildingService.upload(value.getBuildingName(), csv, value.getId(), value.getIsAdmin());
        log.info("BUILDING upload completed.");
        powerService.upload(buildingID, csv);
        log.info("POWER upload completed.");

        return ResponseEntity.ok(buildingID);
    }

    @PostMapping("/view/admin")
    public ResponseEntity<AdminFile> adminView(@RequestBody HashMap<Object, Object> id) {
        return ResponseEntity.ok(buildingService.adminView((String) id.get("id")));
    }

    @PostMapping("/view/user")
    public ResponseEntity<List<BuildingInfo>> userView(@RequestBody HashMap<Object, Object> id) {
        List<BuildingInfo> buildingInfos = buildingService.userView((String) id.get("id"));
        return ResponseEntity.ok(buildingInfos);
    }
}
