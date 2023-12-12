package powerplant.powerpred.building;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Building {

    @Id
    private Long id;
    private String name;
    private String userid;
    private String csv;
}
