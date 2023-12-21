package powerplant.powerpred.building;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import java.sql.Blob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Building {

    @Id
    private Long id;
    private String name;
    private String userid;
    private Boolean trained;
    private String adminID;
    @Lob
    private Blob csvFile;
}
